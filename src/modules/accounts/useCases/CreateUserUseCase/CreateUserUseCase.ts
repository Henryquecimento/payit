import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

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

    if (userAlreadyExists) throw new AppError("User already exists!", 400);

    const user = await this.usersrepository.create({
      name,
      password,
      email,
      isAdmin,
    });

    return user;
  }
}

export { CreateUserUseCase };
