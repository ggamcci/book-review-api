import { z } from "zod";

export const addWishlistSchema = z.object({
  userId: z.coerce.number().int(),
  bookId: z.coerce.number().int(),
});
