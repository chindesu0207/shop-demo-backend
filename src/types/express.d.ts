import { JwtUserPayload } from "../utils/jwt";

//定義 global req.user
declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}
