import express from 'express';
import dotenv from 'dotenv';
import { logger } from '@9jalinks/logger';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.get('/', (req, res) => {
    res.json({ success: true, message: 'Auth Service is running' });
});

app.use('/', authRoutes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(port, () => {
    logger.info(`Auth service listening at http://localhost:${port}`);
});
