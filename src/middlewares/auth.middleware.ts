import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verifyJwt } from "../utils/jwt";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("未提供有效的 Token", 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyJwt(token);
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  } catch {
    next(new AppError("Token 驗證失敗或已過期", 401));
  }
};

export default verifyToken;
