import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject } from "tsyringe";

import AuthConfig from "@config/AuthConfig";
import { IAuthenticateDTO } from "@modules/accounts/dtos/IAuthenticateDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { IncorrectEmailOrPassword } from "./IncorrectEmailOrPassword.ts";

interface IRequest {
  user_id: string;
  password: string;
}

class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, password }: IRequest): Promise<IAuthenticateDTO> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new IncorrectEmailOrPassword();

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new IncorrectEmailOrPassword();

    const { secret, expiresIn } = AuthConfig.JWT;

    const token = sign({ user }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
