// src/validators/reviewValidator.ts
import { z } from "zod";

export const createReviewSchema = z.object({
  userId: z.coerce.number().int(),
  bookId: z.coerce.number().int(),
  rating: z.coerce
    .number()
    .int()
    .min(1, "평점은 1 이상이어야 합니다.")
    .max(5, "평점은 5 이하여야 합니다."),
  content: z.string().min(1, "리뷰 내용을 입력해야 합니다."),
});

export const updateReviewSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5).optional(),
  content: z.string().min(1).optional(),
});
