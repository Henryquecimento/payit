import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import AuthConfig from "@config/AuthConfig";
import { JWTInvalidTokenError } from "@shared/errors/JWTInvalidTokenError";
import { JWTTokenMissingError } from "@shared/errors/JWTTokenMissingError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new JWTTokenMissingError();
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, AuthConfig.JWT.secret) as IPayload;

    request.user = {
      user_id,
    };

    next();
  } catch {
    throw new JWTInvalidTokenError();
  }
}
