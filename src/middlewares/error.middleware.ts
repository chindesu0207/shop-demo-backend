import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

const errorHandler = (err: Error | AppError, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "伺服器錯誤",
  });
};

export default errorHandler;
