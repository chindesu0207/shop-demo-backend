import { Request, Response } from "express";
import { authUser, createUser } from "../services/auth.service";
import handleErrorAsync from "../utils/handleErrorAsync";

export const registerUser = handleErrorAsync(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const user = await createUser({ email, password, name });

  res.status(201).json({
    status: "success",
    message: "註冊成功",
    user,
  });
});

export const loginUser = handleErrorAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = await authUser(email, password);

  res.status(200).json({
    status: "success",
    message: "登入成功",
    data,
  });
});
