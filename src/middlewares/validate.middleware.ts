import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../utils/AppError";

type ReqProperty = "body" | "query" | "params";

export const validate = <T>(schema: ZodSchema<T>, property: ReqProperty) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req[property]);

    if (!result.success) {
      const errorMessage = result.error.errors
        .map((err) => (err.message === "Required" ? err.path.join(".") : err.message))
        .join(", ");

      return next(new AppError(`${errorMessage}，欄位未填寫正確`, 400));
    }

    req[property] = result.data;
    next();
  };
};
