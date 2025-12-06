// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: any;
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const code = err.code || "INTERNAL_SERVER_ERROR";

  // ✅ 1️⃣ 서버 콘솔에 에러 로그 + 스택트레이스 출력
  console.error("===== [ERROR LOG] =====");
  console.error("METHOD:", req.method);
  console.error("PATH:", req.originalUrl);
  console.error("STATUS:", status);

  if (err.stack) {
    console.error("STACK TRACE:");
    console.error(err.stack);
  } else {
    console.error("ERROR:", err);
  }

  console.error("===== [ERROR END] =====");

  // ✅ 2️⃣ 클라이언트로는 과제 표준 에러 포맷으로 응답
  res.status(status).json({
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    status,
    code,
    message: err.message || "Internal Server Error",
    details: err.details || null,
  });
}
