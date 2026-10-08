import express from "express";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getOverview } from "../controllers/adminController.js";

const router = express.Router();
/**
 * @swagger
 * /admin/overview:
 *   get:
 *     summary: Get administrator dashboard overview
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin overview retrieved
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.get("/overview", protect, adminOnly, getOverview);

export default router;
