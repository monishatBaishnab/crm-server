import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Create an instance of the Express application
const app: Application = express();

// Middlewares to parse json and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable Cross-Origin Resource Sharing (CORS) with specified options
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  }),
);

export default app;
