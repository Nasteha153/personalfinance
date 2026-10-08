import express from "express";

import {
  createTransaction,
  getTransactions,
  getMonthlySummary,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { transactionSchema } from "../validations/transactionValidation.js";

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Invalid transaction data
 *       401:
 *         description: Authentication required
 */
router.post("/", validate(transactionSchema), createTransaction);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get the current user's transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Filter by transaction type
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Transactions retrieved
 *       401:
 *         description: Authentication required
 */
router.get("/", getTransactions);

/**
 * @swagger
 * /transactions/monthly-summary:
 *   get:
 *     summary: Get monthly income, expenses and balance
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2026
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         example: 5
 *     responses:
 *       200:
 *         description: Monthly summary retrieved
 *       400:
 *         description: Invalid year or month
 */
router.get("/monthly-summary", getMonthlySummary);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     responses:
 *       200:
 *         description: Transaction updated
 *       404:
 *         description: Transaction not found
 */
router.put("/:id", validate(transactionSchema), updateTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 *       404:
 *         description: Transaction not found
 */
router.delete("/:id", deleteTransaction);

export default router;
