import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payment.js';
import downloadRoutes from './routes/downloads.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('IGNOU IQ HINDI API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
