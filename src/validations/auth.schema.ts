import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.string().email("Email 格式錯誤"),
  password: z.string().min(8, "密碼至少需 8 碼"),
  name: z.string().min(1, "名稱不得為空"),
});

export const loginUserSchema = z.object({
  email: z.string().email("Email 格式錯誤"),
  password: z.string().min(8, "密碼至少需 8 碼"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
