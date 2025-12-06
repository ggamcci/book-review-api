import { z } from "zod";4

export const changeRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
});

