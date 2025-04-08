import bcrypt from "bcrypt";

export const FormatToBcrypt = async (data: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(data, saltRounds);
};
