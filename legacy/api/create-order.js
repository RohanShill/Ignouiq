import Razorpay from 'razorpay';
import { connectToDatabase } from '../lib/mongodb';
import { getUserFromRequest } from '../lib/auth';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

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

    const { amount, currency, productId, productName } = req.body;

    // Validation
    if (!amount || !productId) {
      return res.status(400).json({ error: 'Amount and product ID are required' });
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        product_id: productId,
        product_name: productName,
        user_id: user.userId
      }
    };

    const order = await razorpay.orders.create(options);

    // Save order to database
    const { db } = await connectToDatabase();
    await db.collection('orders').insertOne({
      orderId: order.id,
      userId: user.userId,
      productId,
      productName,
      amount,
      currency: order.currency,
      status: 'created',
      createdAt: new Date()
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
}
