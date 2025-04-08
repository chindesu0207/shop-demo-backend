import jwt from "jsonwebtoken";

export interface JwtUserPayload {
  id: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES = Number(process.env.JWT_EXPIRES) || 604800;

export const signJwt = (payload: object, expiresIn = JWT_EXPIRES) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyJwt = (token: string): JwtUserPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtUserPayload;
};
