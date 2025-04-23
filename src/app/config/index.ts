import env from "dotenv";
import path from "path";

env.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT,
};
