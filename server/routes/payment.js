import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User.js';

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, productId, productName } = req.body;

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: "INR",
            receipt: `order_${Date.now()}`,
            notes: {
                productId,
                productName
            }
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating order' });
    }
});

// Verify Payment
router.post('/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId, userId } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Payment verified - Update User
            if (userId) {
                await User.findByIdAndUpdate(userId, {
                    $push: {
                        purchasedItems: {
                            productId,
                            title: "Purchased Item", // You should pass the title or fetch it
                            purchaseDate: new Date(),
                            orderId: razorpay_order_id,
                            amount: 0 // You should store the amount
                        }
                    }
                });
            }

            res.json({
                verified: true,
                downloadUrl: '#' // Return actual download link here
            });
        } else {
            res.status(400).json({ verified: false, message: 'Invalid signature' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ verified: false, message: 'Server Error' });
    }
});

export default router;
