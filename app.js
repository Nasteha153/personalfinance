import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Rate limiting
app.use(rateLimit)

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Personal Finance Tracker API is running",
  });
});


export default app;