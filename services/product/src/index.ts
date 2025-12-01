import express from 'express';
import dotenv from 'dotenv';
import { logger } from '@9jalinks/logger';
import { connectDB } from './config/database';
import productRoutes from './routes/products';

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.json({ success: true, message: 'Product Service is running' });
});

app.use('/', productRoutes);

app.listen(port, () => {
    logger.info(`Product service listening at http://localhost:${port}`);
});
