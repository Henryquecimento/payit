import { AppError } from "@shared/errors/AppError";

export class GetStatementOperationError extends AppError {
  constructor() {
    super("User Not Found", 404);
  }
}
