// src/middlewares/logger.ts
import { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  // 응답이 끝났을 때 실행
  res.on("finish", () => {
    const duration = Date.now() - start;

    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;

    // 여기서 실제 로그 출력
    console.log(
      `[REQ] ${method} ${url} ${status} ${duration}ms`
    );
  });

  next();
}
