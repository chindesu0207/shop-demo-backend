import { Request, Response } from "express";
import handleErrorAsync from "../../utils/handleErrorAsync";
import { omitFields } from "../../utils/omitField";
import { priceOptionRepo } from "../../repos/priceOption.repo";

export const getPriceOption = handleErrorAsync(async (req: Request, res: Response) => {
  const { priceOptionId } = req.params;

  const priceOption = await priceOptionRepo.getById(priceOptionId);

  const filtered = omitFields(priceOption, ["id", "productId"]);
  res.status(200).json({
    status: "success",
    data: filtered,
  });
});
