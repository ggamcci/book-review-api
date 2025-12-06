import { z } from "zod";

export const addCartSchema = z.object({
  userId: z.coerce.number().int(),
  bookId: z.coerce.number().int(),
  quantity: z.coerce.number().int().min(1),
});

export const updateCartSchema = z.object({
  quantity: z.number().int().min(1),
});
