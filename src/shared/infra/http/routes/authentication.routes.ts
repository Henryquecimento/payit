import { Router } from "express";

import { AuthencateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";

const AuthenticateRouter = Router();

const authenticateController = new AuthencateUserController();

AuthenticateRouter.post("/sessions", authenticateController.handle);

export { AuthenticateRouter };
