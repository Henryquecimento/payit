import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../CreateUserUseCase/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPassword } from "./IncorrectEmailOrPassword.ts";

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
  });

  it("Should be able to authenticate an User", async () => {
    const user: ICreateUsersDTO = await createUserUseCase.execute({
      name: "User Test",
      email: "user@test.com",
      password: "test",
      isAdmin: true,
    });

    const auth = await authenticateUserUseCase.execute({
      email: user.email,
      password: "test",
    });

    expect(auth).toHaveProperty("token");
  });

  it("Should not be able to authenticate an User with wrong password", () => {
    expect(async () => {
      const user: ICreateUsersDTO = await createUserUseCase.execute({
        name: "User Test",
        email: "user@test.com",
        password: "test",
        isAdmin: true,
      });

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong_password",
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPassword);
  });

  it("Should not be able to authenticate an User with wrong email", () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "User Test",
        email: "user@test.com",
        password: "test",
        isAdmin: true,
      });

      await authenticateUserUseCase.execute({
        email: "wrong_email",
        password: "test",
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPassword);
  });
});
