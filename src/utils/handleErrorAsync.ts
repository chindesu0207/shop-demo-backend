import { NextFunction, Request, RequestHandler, Response } from "express";

//包裝 async controller，捕捉錯誤並透過 next() 傳遞給錯誤。可取代每個 controller 中重複的 try/catch。
const handleErrorAsync = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

export default handleErrorAsync;
