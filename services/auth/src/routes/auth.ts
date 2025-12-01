import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { logger } from '@9jalinks/logger';
import { ApiResponse } from '@9jalinks/common';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password, name, role } = req.body;

        // Validate input
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                error: 'Please provide email, password, and name',
            } as ApiResponse<null>);
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'User already exists',
            } as ApiResponse<null>);
        }

        // Create user
        const user = new User({
            email,
            password,
            name,
            role: role || 'user',
        });

        await user.save();

        // Generate token
        const secret = process.env.JWT_SECRET || 'your-secret-key';
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            secret,
            { expiresIn: '7d' }
        );

        logger.info(`User registered: ${email}`);

        res.status(201).json({
            success: true,
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
            message: 'User registered successfully',
        } as ApiResponse<any>);
    } catch (error) {
        logger.error({ err: error }, 'Registration error');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide email and password',
            } as ApiResponse<null>);
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            } as ApiResponse<null>);
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            } as ApiResponse<null>);
        }

        // Generate token
        const secret = process.env.JWT_SECRET || 'your-secret-key';
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            secret,
            { expiresIn: '7d' }
        );

        logger.info(`User logged in: ${email}`);

        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
            message: 'Login successful',
        } as ApiResponse<any>);
    } catch (error) {
        logger.error({ err: error }, 'Login error');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

export default router;
