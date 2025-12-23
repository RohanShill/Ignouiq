import 'dotenv/config';
import mongoose from 'mongoose';
import User from './server/models/User.js';
import bcrypt from 'bcryptjs';

const createTestUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const email = 'test_dl@example.com';

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists. Updating...');
        } else {
            console.log('Creating new user...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password', salt);

            user = new User({
                name: 'Test Downloader',
                email,
                phone: '9999999999',
                password: hashedPassword
            });
        }

        // Add purchased item if not present
        const productId = '1';
        const hasItem = user.purchasedItems.some(item => item.productId === productId);

        if (!hasItem) {
            user.purchasedItems.push({
                productId,
                title: 'Test PDF Note',
                purchaseDate: new Date(),
                orderId: 'manual_test',
                amount: 0
            });
            await user.save();
            console.log('User updated with purchased item.');
        } else {
            console.log('User already has the item.');
        }

        console.log('Done.');
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createTestUser();
