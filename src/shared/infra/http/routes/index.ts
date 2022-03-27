import { Router } from "express";

import { UsersRoutes } from "./users.routes";
import { UserProfileRoutes } from "./usersProfile.routes";

const router = Router();

router.use("/users", UsersRoutes);
router.use("/profile", UserProfileRoutes);

export { router };
