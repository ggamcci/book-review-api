// src/validators/bookValidator.ts
import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "제목은 1자 이상이어야 합니다."),
  author: z.string().min(1, "저자를 입력해야 합니다."),
  // 클라이언트가 "25000"처럼 string을 보낼 수도 있으면 z.coerce.number() 사용
  price: z.coerce.number().min(0, "가격은 0 이상이어야 합니다."),
  stock: z.coerce.number().min(0, "재고는 0 이상이어야 합니다."),
  category: z.string().optional(),
});

export const updateBookSchema = z.object({
  title: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  price: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().min(0).optional(),
  category: z.string().optional(),
});
