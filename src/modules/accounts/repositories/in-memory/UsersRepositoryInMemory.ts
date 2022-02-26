import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UserRepositoryInMemory implements IUsersRepository {
  Users: User[] = [];

  async create({
    name,
    password,
    email,
    isAdmin,
  }: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      email,
      isAdmin,
    });

    this.Users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.Users.find((user) => user.email === email);
  }
}

export { UserRepositoryInMemory };
