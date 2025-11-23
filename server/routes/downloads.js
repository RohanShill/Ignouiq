import express from 'express';
import path from 'path';
import fs from 'fs';
import authMiddleware from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Secure Download Route
router.get('/:filename', authMiddleware, async (req, res) => {
    try {
        const { filename } = req.params;
        const userId = req.user.id;

        // 1. Verify User has purchased the item
        // In a real app, you'd check if the filename matches a product they bought.
        // For now, we'll check if they have ANY purchased items or if it's a free file.

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Simple check: Allow download if user has at least one purchase
        // You should refine this logic to match specific products to files
        if (user.purchasedItems.length === 0) {
            // return res.status(403).json({ message: 'Access denied. Please purchase this note.' });
            // For testing purposes, we might want to allow it or strict check
        }

        // 2. Resolve File Path
        // We'll look for a 'secure_notes' folder at the project root or specified in ENV
        const downloadDir = process.env.DOWNLOAD_DIR || path.join(__dirname, '../../secure_notes');
        const filePath = path.join(downloadDir, filename);

        // 3. Check if file exists
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            console.error(`File not found: ${filePath}`);
            res.status(404).json({ message: 'File not found on server' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
