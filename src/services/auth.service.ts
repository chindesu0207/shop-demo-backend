import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";
import { AppError } from "../utils/AppError";
import { UserRepo } from "../repos/user.repo";
import { InsertUser } from "../db/schema";
import { JwtPayload } from "jsonwebtoken";
import { FormatToBcrypt } from "../utils/tools/format.tool";

export const createUser = async ({ email, password, name }: InsertUser) => {
  const existing = await UserRepo.getByEmail(email);
  if (existing) throw new AppError("此 Email 已註冊", 409);

  const hashPassword = await FormatToBcrypt(password);

  const result = await UserRepo.create({ email, password: hashPassword, name });
  return result;
};

export const authUser = async (email: string, password: string) => {
  const user = await UserRepo.getByEmail(email);
  if (!user) throw new AppError("帳號不存在", 404);

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new AppError("密碼錯誤", 401);

  const token = signJwt({
    id: user.id,
    email: user.email,
  } as JwtPayload);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
};
