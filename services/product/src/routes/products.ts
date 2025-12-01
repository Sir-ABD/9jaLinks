import { Router, Request, Response } from 'express';
import { Product } from '../models/Product';
import { logger } from '@9jalinks/logger';
import { ApiResponse } from '@9jalinks/common';

const router = Router();

// Get all products (with pagination and filters)
router.get('/', async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, vendorId, category, search } = req.query;

        const query: any = { isActive: true };

        if (vendorId) query.vendorId = vendorId;
        if (category) query.category = category;
        if (search) query.$text = { $search: search as string };

        const products = await Product.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments(query);

        res.json({
            success: true,
            data: {
                products,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / Number(limit)),
                },
            },
        } as ApiResponse<any>);
    } catch (error) {
        logger.error({ err: error }, 'Error fetching products');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

// Get single product
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            } as ApiResponse<null>);
        }

        res.json({
            success: true,
            data: product,
        } as ApiResponse<any>);
    } catch (error) {
        logger.error({ err: error }, 'Error fetching product');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

// Create product
router.post('/', async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();

        logger.info(`Product created: ${product._id}`);

        res.status(201).json({
            success: true,
            data: product,
            message: 'Product created successfully',
        } as ApiResponse<any>);
    } catch (error) {
        logger.error({ err: error }, 'Error creating product');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

// Update product
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            } as ApiResponse<null>);
        }

        logger.info(`Product updated: ${product._id}`);

        res.json({
            success: true,
            data: product,
            message: 'Product updated successfully',
        } as ApiResponse<any>);
    } catch (error) {
        logger.error({ err: error }, 'Error updating product');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

// Delete product
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            } as ApiResponse<null>);
        }

        logger.info(`Product deleted: ${product._id}`);

        res.json({
            success: true,
            message: 'Product deleted successfully',
        } as ApiResponse<null>);
    } catch (error) {
        logger.error({ err: error }, 'Error deleting product');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

// Update stock
router.patch('/:id/stock', async (req: Request, res: Response) => {
    try {
        const { quantity } = req.body;

        if (typeof quantity !== 'number') {
            return res.status(400).json({
                success: false,
                error: 'Quantity must be a number',
            } as ApiResponse<null>);
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            } as ApiResponse<null>);
        }

        product.stock = Math.max(0, product.stock + quantity);
        await product.save();

        logger.info(`Product stock updated: ${product._id}, new stock: ${product.stock}`);

        res.json({
            success: true,
            data: product,
            message: 'Stock updated successfully',
        } as ApiResponse<any>);
    } catch (error) {
        logger.error({ err: error }, 'Error updating stock');
        res.status(500).json({
            success: false,
            error: 'Server error',
        } as ApiResponse<null>);
    }
});

export default router;
