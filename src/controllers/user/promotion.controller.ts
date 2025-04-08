import { Request, Response } from "express";
import handleErrorAsync from "../../utils/handleErrorAsync";
import { omitFields } from "../../utils/omitField";
import { PromotionRepo } from "../../repos/promotion.repo";

export const getPromotionList = handleErrorAsync(async (_req: Request, res: Response) => {
  const promotions = await PromotionRepo.getAll();

  const filtered = promotions.map((item) => omitFields(item, ["isActive", "targetProductIds"]));
  res.status(200).json({
    status: "success",
    data: filtered,
  });
});
