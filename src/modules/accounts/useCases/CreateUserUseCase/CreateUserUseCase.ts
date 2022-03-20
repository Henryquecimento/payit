import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { CreateUserError } from "./CreateUsersError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersrepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    email,
    isAdmin = false,
  }: ICreateUsersDTO): Promise<User> {
    if (!email) throw new Error("Email incorrect!");

    const userAlreadyExists = await this.usersrepository.findByEmail(email);

    if (userAlreadyExists) throw new CreateUserError.UserNotFound();

    const passwordHash = await hash(password, 8);

    const user = await this.usersrepository.create({
      name,
      password: passwordHash,
      email,
      isAdmin,
    });

    return user;
  }
}

export { CreateUserUseCase };
