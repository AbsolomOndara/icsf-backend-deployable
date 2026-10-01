import { z } from "zod";
export const registerSchema = z.object({ name: z.string().min(2).max(100), email: z.string().email(), password: z.string().min(8).max(128) });
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
export const changePasswordSchema = z.object({ currentPassword: z.string().min(1), newPassword: z.string().min(8).max(128) });
export const profileSchema = z.object({ name: z.string().min(2).max(100), phone: z.string().max(30).optional().or(z.literal("")), expertise: z.string().max(150).optional().or(z.literal("")), bio: z.string().max(1500).optional().or(z.literal("")) });
export const forgotPasswordSchema = z.object({ email: z.string().email() });
export const resetPasswordSchema = z.object({ token: z.string().min(20), newPassword: z.string().min(8).max(128) });
