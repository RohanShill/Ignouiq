import crypto from 'crypto';
import { connectToDatabase } from '../lib/mongodb';
import { getUserFromRequest } from '../lib/auth';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify user is logged in
    const user = getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productId
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ 
        success: false, 
        verified: false,
        error: 'Invalid signature' 
      });
    }

    // Payment verified - Update database
    const { db } = await connectToDatabase();

    // Update order status
    await db.collection('orders').updateOne(
      { orderId: razorpay_order_id },
      {
        $set: {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: 'paid',
          paidAt: new Date()
        }
      }
    );

    // Add purchase to user
    await db.collection('users').updateOne(
      { _id: user.userId },
      {
        $push: {
          purchases: {
            productId,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            purchasedAt: new Date()
          }
        }
      }
    );

    res.status(200).json({
      success: true,
      verified: true,
      message: 'Payment verified successfully',
      downloadUrl: `/download?product=${productId}`
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Error verifying payment' });
  }
}
