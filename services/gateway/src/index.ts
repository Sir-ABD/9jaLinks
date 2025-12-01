import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from '@9jalinks/logger';
import { authMiddleware, optionalAuth } from './middleware/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Service URLs
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
const USER_SERVICE = process.env.USER_SERVICE_URL || 'http://localhost:3002';
const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3003';

// Health check
app.get('/health', (req, res) => {
    res.json({ success: true, message: 'API Gateway is running' });
});

// Auth routes (public)
app.use('/api/auth', createProxyMiddleware({
    target: AUTH_SERVICE,
    changeOrigin: true,
    pathRewrite: {
        '^/api/auth': ''
    },
    onProxyReq: (proxyReq, req, res) => {
        logger.info(`Proxying ${req.method} ${req.path} to Auth Service`);
    },
    onError: (err, req, res) => {
        logger.error({ err }, 'Proxy error');
        res.status(500).json({ success: false, error: 'Proxy error' });
    },
}));

// User routes (protected)
app.use('/api/users', authMiddleware, createProxyMiddleware({
    target: USER_SERVICE,
    changeOrigin: true,
    pathRewrite: {
        '^/api/users': ''
    },
    onProxyReq: (proxyReq, req, res) => {
        logger.info(`Proxying ${req.method} ${req.path} to User Service`);
    },
}));

// Product routes (mixed - some public, some protected)
app.use('/api/products', optionalAuth, createProxyMiddleware({
    target: PRODUCT_SERVICE,
    changeOrigin: true,
    pathRewrite: {
        '^/api/products': ''
    },
    onProxyReq: (proxyReq, req, res) => {
        logger.info(`Proxying ${req.method} ${req.path} to Product Service`);
    },
}));

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error({ err }, 'Gateway error');
    res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(port, () => {
    logger.info(`API Gateway listening at http://localhost:${port}`);
    logger.info(`Auth Service: ${AUTH_SERVICE}`);
    logger.info(`User Service: ${USER_SERVICE}`);
    logger.info(`Product Service: ${PRODUCT_SERVICE}`);
});
