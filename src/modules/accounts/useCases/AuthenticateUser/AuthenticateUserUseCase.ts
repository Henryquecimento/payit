import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import AuthConfig from "@config/AuthConfig";
import { IAuthenticateDTO } from "@modules/accounts/dtos/IAuthenticateDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { IncorrectEmailOrPassword } from "./IncorrectEmailOrPassword.ts";

interface IRequest {
  email: string;
  password: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IAuthenticateDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new IncorrectEmailOrPassword();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new IncorrectEmailOrPassword();
    }

    const { secret, expiresIn } = AuthConfig.jwt;

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
