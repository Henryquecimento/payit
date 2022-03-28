import { Router } from "express";

import { AuthenticateRouter } from "./authentication.routes";
import { UsersRoutes } from "./users.routes";
import { UserProfileRoutes } from "./usersProfile.routes";

const router = Router();

router.use("/", AuthenticateRouter);
router.use("/users", UsersRoutes);
router.use("/profile", UserProfileRoutes);

export { router };
