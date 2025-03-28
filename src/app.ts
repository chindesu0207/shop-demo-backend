import express from "express";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
import router from "./routes";
import corsOptions from "./config/corsOptions";
import errorHandler from "./middlewares/error.middleware";
import notFoundHandler from "./middlewares/notFound.middleware";

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

//攔截所有沒有對應到的路由
app.use(notFoundHandler);

//錯誤處理
app.use(errorHandler);

export default app;
