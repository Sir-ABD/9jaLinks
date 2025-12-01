import mongoose from 'mongoose';
import { logger } from '@9jalinks/logger';

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/9jalinks';
        await mongoose.connect(mongoURI);
        logger.info('MongoDB connected successfully (Product Service)');
    } catch (error) {
        logger.error({ err: error }, 'MongoDB connection error');
        process.exit(1);
    }
};
