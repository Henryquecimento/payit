import { Router } from "express";

import { ShowUserProfileController } from "@modules/accounts/useCases/ShowUserProfile/ShowUserProfileController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const UserProfileRoutes = Router();

const showUserProfileController = new ShowUserProfileController();

UserProfileRoutes.use(ensureAuthenticated);

UserProfileRoutes.get("/", showUserProfileController.handle);

export { UserProfileRoutes };
