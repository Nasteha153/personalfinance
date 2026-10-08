import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { logger } from "./middleware/logger.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { limiter } from "./middleware/rateLimiter.js";

import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";
import uploadRoutes from "./routes/upload.js";
import adminRoutes from "./routes/admin.js";

import { swaggerSpec } from "./utils/swagger.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors());

// Request middleware
app.use(logger);
app.use(express.json());
app.use(limiter);

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Personal Finance Tracker API is running",
  });
});

// API routes
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
app.use("/categories", categoryRoutes);
app.use("/upload", uploadRoutes);
app.use("/admin", adminRoutes);

// Swagger documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling — keep these last
app.use(notFound);
app.use(errorHandler);

// MongoDB connection
const mongoUri =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

if (!mongoUri) {
  console.error("❌ MongoDB connection string is missing from .env");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
  
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });