// src/validators/authValidator.ts
import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(1, "username은 1자 이상이어야 합니다."),
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  password: z.string().min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
});

export const loginSchema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  password: z.string().min(1, "비밀번호를 입력해야 합니다."),
});
