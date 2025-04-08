import { CorsOptions } from "cors";

const whitelist = process.env.CORS_WHITELIST?.split(",").map((origin) => origin.trim()) ?? [];
console.log(whitelist);

const isLocalhost = (origin: string) => {
  try {
    const url = new URL(origin);
    return url.hostname === "localhost" || url.hostname === "127.0.0.1";
  } catch {
    return false;
  }
};

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (isLocalhost(origin) || whitelist.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

export default corsOptions;
