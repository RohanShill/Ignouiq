import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['notes', 'assignments', 'classes']
    },
    course: String,
    semester: Number,
    filename: {
        type: String,
        required: true
    },
    imageUrl: String,
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
