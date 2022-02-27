import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let createUsersRepositoryInMemory: UserRepositoryInMemory;

describe("Create User", () => {
  beforeAll(() => {
    createUsersRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(createUsersRepositoryInMemory);
  });

  it("Should be able to create a new User", async () => {
    const user = await createUserUseCase.execute({
      name: "Test",
      password: "1234",
      email: "test@test.com",
      isAdmin: true,
    });

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create a new User with the same email", async () => {
    await expect(
      createUserUseCase.execute({
        name: "Test2",
        password: "1234",
        email: "test@test.com",
        isAdmin: true,
      })
    ).rejects.toEqual(new AppError("User already exists!", 400));
  });
});
