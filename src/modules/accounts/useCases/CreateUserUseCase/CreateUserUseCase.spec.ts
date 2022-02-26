import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

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
});
