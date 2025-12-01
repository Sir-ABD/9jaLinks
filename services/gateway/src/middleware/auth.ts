import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '@9jalinks/logger';

export interface AuthRequest extends Request {
    userId?: string;
    userRole?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, error: 'No token provided' });
        }

        const secret = process.env.JWT_SECRET || 'your-secret-key';
        const decoded = jwt.verify(token, secret) as { userId: string; role: string };

        req.userId = decoded.userId;
        req.userRole = decoded.role;

        // Add user info to headers for downstream services
        req.headers['x-user-id'] = decoded.userId;
        req.headers['x-user-role'] = decoded.role;

        next();
    } catch (error) {
        logger.error({ err: error }, 'Auth middleware error');
        return res.status(401).json({ success: false, error: 'Invalid token' });
    }
};

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            const secret = process.env.JWT_SECRET || 'your-secret-key';
            const decoded = jwt.verify(token, secret) as { userId: string; role: string };

            req.userId = decoded.userId;
            req.userRole = decoded.role;
            req.headers['x-user-id'] = decoded.userId;
            req.headers['x-user-role'] = decoded.role;
        }

        next();
    } catch (error) {
        // Continue without auth
        next();
    }
};
