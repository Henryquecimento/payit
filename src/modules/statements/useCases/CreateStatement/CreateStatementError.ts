/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/AppError";

export namespace CreateStatementError {
  export class UserNotFound extends AppError {
    constructor() {
      super("User Not Found", 404);
    }
  }
  export class InsufficientFunds extends AppError {
    constructor() {
      super("Insufficient Funds", 400);
    }
  }
}
