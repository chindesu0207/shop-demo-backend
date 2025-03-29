import { Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `查無此路由：${req.method} ${req.originalUrl}`,
  });
};

export default notFoundHandler;
