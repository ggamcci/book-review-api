// src/validators/orderValidator.ts
import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z.coerce.number().int(),
  bookId: z.coerce.number().int(),
  totalPrice: z.coerce.number().min(0),
  status: z.string().min(1),          // 예: "ORDERED"
  paymentMethod: z.string().optional() // 예: "CARD"
});

export const updateOrderStatusSchema = z.object({
  status: z.string().min(1, "status는 필수입니다."), // 예: "COMPLETED"
});
