import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  async handle(request: Request, response: Response) {
    const { user_id } = request.user;

    const showUserProfileUseCase = container.resolve(ShowUserProfileUseCase);

    const userProfile = await showUserProfileUseCase.execute(user_id);

    return response.status(200).json(userProfile);
  }
}

export { ShowUserProfileController };
