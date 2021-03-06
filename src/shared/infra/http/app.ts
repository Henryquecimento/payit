import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";

import { AppError } from "@shared/errors/AppError";

import createConnection from "../typeorm";
import "@shared/containers";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      err: `Internal Server Error - ${err.message}`,
    });
  }
);

export { app };
