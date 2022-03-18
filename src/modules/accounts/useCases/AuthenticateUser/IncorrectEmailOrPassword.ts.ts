import { AppError } from "@shared/errors/AppError";

export class IncorrectEmailOrPassword extends AppError {
  constructor() {
    super("Incorrect Email Or Password", 401);
  }
}
