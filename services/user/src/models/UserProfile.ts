import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProfile extends Document {
    userId: string;
    email: string;
    name: string;
    role: 'user' | 'admin' | 'vendor';
    phone?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        zipCode?: string;
    };
    preferences?: {
        language?: string;
        currency?: string;
        notifications?: boolean;
    };
}

const UserProfileSchema = new Schema<IUserProfile>({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'vendor'],
        default: 'user',
    },
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
    },
    preferences: {
        language: { type: String, default: 'en' },
        currency: { type: String, default: 'NGN' },
        notifications: { type: Boolean, default: true },
    },
}, {
    timestamps: true,
});

export const UserProfile = mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);
