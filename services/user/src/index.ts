import express from 'express';
import dotenv from 'dotenv';
import { logger } from '@9jalinks/logger';
import { connectDB } from './config/database';
import userRoutes from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.json({ success: true, message: 'User Service is running' });
});

app.use('/', userRoutes);

app.listen(port, () => {
    logger.info(`User service listening at http://localhost:${port}`);
});
