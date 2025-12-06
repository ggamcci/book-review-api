// src/middlewares/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        status: 400,
        code: "VALIDATION_FAILED",
        message: "입력값이 올바르지 않습니다.",
        details: result.error.flatten().fieldErrors, // 어떤 필드가 왜 잘못됐는지
      });
    }

    // 필요하다면 검증된 데이터만 사용하고 싶을 때:
    // req.body = result.data;

    next();
  };
