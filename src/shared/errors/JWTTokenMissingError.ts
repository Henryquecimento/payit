import { AppError } from "./AppError";

export class JWTTokenMissingError extends AppError {
  constructor() {
    super("JWT Token is missing", 401);
  }
}
