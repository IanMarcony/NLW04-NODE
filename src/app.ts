import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import routes from "./routes";
import AppError from "./errors/AppError";

import createConnection from "./database";
createConnection();
const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: "error", message: err.message });
    }
    console.error(err);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

export { app };