import { Router, Request, Response } from 'express';
import { UserProfile } from '../models/UserProfile';
import { logger } from '@9jalinks/logger';
import { ApiResponse } from '@9jalinks/common';

const router = Router();

// Get user profile
router.get('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const profile = await UserProfile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                error: 'User profile not found',
            } as ApiResponse<null>);
        }

        res.json({
            success: true,
            data: profile,
        } as ApiResponse<any>);
    } catch (error) {
        logger.error({ err: error }, 'Error fetching user profile');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

// Create user profile
router.post('/', async (req: Request, res: Response) => {
    try {
        const profileData = req.body;

        const existingProfile = await UserProfile.findOne({ userId: profileData.userId });
        if (existingProfile) {
            return res.status(400).json({
                success: false,
                error: 'User profile already exists',
            } as ApiResponse<null>);
        }

        const profile = new UserProfile(profileData);
        await profile.save();

        logger.info(`User profile created: ${profileData.userId}`);

        res.status(201).json({
            success: true,
            data: profile,
            message: 'User profile created successfully',
        } as ApiResponse<any>);
    } catch (error) {
        logger.error({ err: error }, 'Error creating user profile');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

// Update user profile
router.put('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        const profile = await UserProfile.findOneAndUpdate(
            { userId },
            updates,
            { new: true, runValidators: true }
        );

        if (!profile) {
            return res.status(404).json({
                success: false,
                error: 'User profile not found',
            } as ApiResponse<null>);
        }

        logger.info(`User profile updated: ${userId}`);

        res.json({
            success: true,
            data: profile,
            message: 'User profile updated successfully',
        } as ApiResponse<any>);
    } catch (error) {
        logger.error({ err: error }, 'Error updating user profile');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

// Delete user profile
router.delete('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const profile = await UserProfile.findOneAndDelete({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                error: 'User profile not found',
            } as ApiResponse<null>);
        }

        logger.info(`User profile deleted: ${userId}`);

        res.json({
            success: true,
            message: 'User profile deleted successfully',
        } as ApiResponse<null>);
    } catch (error) {
        logger.error({ err: error }, 'Error deleting user profile');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

export default router;
