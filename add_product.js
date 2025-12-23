import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './server/models/Product.js';

// Sample products - Edit these to add your own!
const sampleProducts = [
    {
        _id: 'begc-101',
        title: 'BEGC-101 - Foundation Course in English',
        description: 'Complete study material covering all units of BEGC-101. Includes detailed notes, important questions, and exam preparation tips.',
        price: 99,
        category: 'notes',
        course: 'BA English',
        semester: 1,
        filename: 'begc-101.pdf',
        featured: true
    },
    {
        _id: 'bhdla-135',
        title: 'BHDLA-135 - Hindi Sahitya ka Itihas',
        description: 'हिंदी साहित्य के इतिहास की संपूर्ण अध्ययन सामग्री। सभी युगों का विस्तृत विवरण।',
        price: 149,
        category: 'notes',
        course: 'BA Hindi',
        semester: 1,
        filename: 'bhdla-135.pdf',
        featured: true
    },
    {
        _id: 'assignment-begc-101',
        title: 'BEGC-101 Assignment Solutions',
        description: 'Solved assignments for BEGC-101 with detailed answers and explanations.',
        price: 49,
        category: 'assignments',
        course: 'BA English',
        semester: 1,
        filename: 'assignment-begc-101.pdf',
        featured: false
    }
];

const addProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        // Add all sample products
        for (const productData of sampleProducts) {
            const existing = await Product.findById(productData._id);

            if (existing) {
                console.log(`Product "${productData.title}" already exists. Skipping...`);
            } else {
                const product = new Product(productData);
                await product.save();
                console.log(`✅ Added: ${productData.title}`);
            }
        }

        console.log('\n✅ All products processed successfully!');
        console.log(`\nNext steps:`);
        console.log(`1. Upload corresponding PDFs to Hostinger secure_notes folder`);
        console.log(`2. Make sure filenames match (e.g., begc-101.pdf)`);
        console.log(`3. Products will appear on your website automatically!`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

addProducts();
