import { AppError } from "./AppError";

export class JWTInvalidTokenError extends AppError {
  constructor() {
    super("JWT Invalid Token", 401);
  }
}
