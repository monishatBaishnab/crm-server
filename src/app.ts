import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import global_error from "./app/middlewares/global_error";
import not_found from "./app/middlewares/not_found";
import send_response from "./app/utils/send_response";
import catch_async from "./app/utils/catch_async";
import { app_routes } from "./app/routes";

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
    origin: [
      "http://localhost:5173",
      "https://crm-client-red.vercel.app"
    ],
  }),
);

// Define a GET route for the root URL
app.get(
  "/",
  catch_async((req, res) => {
    send_response(res, {
      success: true,
      status: httpStatus.OK,
      message: "CRM Server Running Smoothly.",
    });
  }),
);

app.use("/api/v1/", app_routes);

// Middleware to handle 404 (Not Found) errors
app.use(/.*/, not_found);

// Middleware to handle global errors
app.use(global_error);

export default app;
