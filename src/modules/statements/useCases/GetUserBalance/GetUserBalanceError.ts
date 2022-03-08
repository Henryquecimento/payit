/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/AppError";

export class GetUserBalanceError extends AppError {
  constructor() {
    super("User Not Found", 404);
  }
}
