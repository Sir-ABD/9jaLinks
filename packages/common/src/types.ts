export interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin' | 'vendor';
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    vendorId: string;
    stock: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
