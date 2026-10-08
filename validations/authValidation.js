import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z
    .string()
    .email("Please provide a valid email"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});