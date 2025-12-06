import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";          // ✅ 추가
import { swaggerSpec } from "./config/swagger";     // ✅ 추가

import router from "./routes"; // ⭐ routes/index.ts 자동 연결
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/logger";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(requestLogger);
// ✅ Swagger UI
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
    time: new Date(),
  });
});

// API root
app.use("/api", router);

// Error handler (항상 마지막!)
app.use(errorHandler);

export default app;
