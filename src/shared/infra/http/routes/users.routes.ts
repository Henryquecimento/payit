import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/CreateUserUseCase/CreateUserController";

const UsersRoutes = Router();

const createUserController = new CreateUserController();

UsersRoutes.post("/", createUserController.handle);

export { UsersRoutes };
