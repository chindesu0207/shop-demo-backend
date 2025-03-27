import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { pool } from "./db";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response) => {
  res.status(404).send(`<h1>404 - 找不到網頁</h1>`);
});

async function startServer() {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("資料庫連線成功");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("資料庫連線失敗：", error);
    process.exit(1);
  }
}

startServer();
