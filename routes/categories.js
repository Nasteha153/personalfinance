import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const defaultCategories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Salary",
  "Other",
];
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get available transaction categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved
 *       401:
 *         description: Authentication required
 */
router.get("/", protect, (req, res) => {
  res.json({
    success: true,
    data: defaultCategories,
  });
});

export default router;
