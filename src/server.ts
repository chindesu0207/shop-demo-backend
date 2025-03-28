import app from "./app";
import { pool } from "./db";

const port = Number(process.env.PORT) || 3000;

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
