import express from "express";

import { register, login, profile } from "../controllers/authController.js";

import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/authMiddleware.js";

import { registerSchema, loginSchema } from "../validations/authValidation.js";

const router = express.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Email already registered
 */
router.post("/register", validate(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive a JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", validate(loginSchema), login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *       401:
 *         description: Authentication required
 */
router.get("/profile", protect, profile);

export default router;
