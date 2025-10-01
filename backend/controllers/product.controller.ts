import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { z } from "zod";

// Validation schema
const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().positive("Price must be positive"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().url().optional(),
});

// Get all products (with filters & sorting)
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, order } = req.query as {
            name?: string;
            description?: string;
            order?: string;
        };

        const filter: Record<string, any> = {};
        if (name) filter.name = { $regex: name, $options: "i" };
        if (description) filter.description = { $regex: description, $options: "i" };

        let sort: Record<string, any> = {};
        if (order === "asc" || order === "desc") {
            sort.price = order === "asc" ? 1 : -1;
        } else {
            sort.createdAt = -1;
        }

        const products = await Product.find(filter).sort(sort).lean();

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

// Create product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = productSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ success: false, error: parsed.error.issues });
        }

        const newProduct = new Product(parsed.data);
        await newProduct.save();

        res.status(201).json({ success: true, data: { product: newProduct } });
    } catch (error) {
        next(error);
    }
};

// Update product (PUT/PATCH)
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ success: false, error: "Invalid product ID" });
    }

    try {
        const parsed = productSchema.partial().safeParse(req.body); // PATCH için kısmi update
        if (!parsed.success) {
            return res.status(400).json({ success: false, error: parsed.error.issues });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            parsed.data,
            { new: true, runValidators: true }
        ).lean();

        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        res.status(200).json({ success: true, data: { product: updatedProduct } });
    } catch (error) {
        next(error);
    }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ success: false, error: "Invalid product ID" });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId).lean();

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        res.status(200).json({ success: true, data: { product: deletedProduct } });
    } catch (error) {
        next(error);
    }
};
