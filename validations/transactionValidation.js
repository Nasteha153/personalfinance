import { z } from "zod";

export const transactionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  amount: z
    .number()
    .refine((value) => value !== 0, {
      message: "Amount cannot be zero",
    }),

  type: z.enum(["income", "expense"]),

  category: z
    .string()
    .min(1, "Category is required"),

  date: z
    .string()
    .date("Date must be in YYYY-MM-DD format"),
});