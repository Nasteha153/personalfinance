import express from "express";
import multer from "multer";

import { protect } from "../middleware/authMiddleware.js";
import { uploadProfilePicture } from "../controllers/uploadController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     summary: Upload a profile picture
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profilePicture
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded
 *       400:
 *         description: Image missing or invalid
 *       401:
 *         description: Authentication required
 */
router.post(
  "/profile-picture",
  protect,
  upload.single("profilePicture"),
  uploadProfilePicture,
);

export default router;
