/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/AppError";

export namespace CreateUserError {
  export class UserNotFound extends AppError {
    constructor() {
      super("User Not Found", 404);
    }
  }
}
