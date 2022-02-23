import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { routes } from "./routes";
import "./app/database";
import { AppError } from "../../errors/AppError";

const app = express();

app.use(express.json());
app.use(routes);

app.use(
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
