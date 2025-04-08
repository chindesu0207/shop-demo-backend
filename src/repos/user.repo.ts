import { eq } from "drizzle-orm";
import { db } from "../db";
import { InsertUser, SelectUser, users } from "../db/schema";

export const UserRepo = {
  getByEmail: async (email: string): Promise<SelectUser | null> => {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0] ?? null;
  },
  create: async ({
    email,
    password,
    name,
  }: InsertUser): Promise<Omit<SelectUser, "password" | "isActive" | "updatedAt">> => {
    const result = await db.insert(users).values({ email, password, name }).returning({
      id: users.id,
      email: users.email,
      name: users.name,
      createdAt: users.createdAt,
    });
    return result[0];
  },
};
