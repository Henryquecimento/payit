import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../CreateUserUseCase/CreateUserUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let usersRepositoryInMemory: UserRepositoryInMemory;
let createUsersUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show User Profile", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    showUserProfileUseCase = new ShowUserProfileUseCase(
      usersRepositoryInMemory
    );
  });

  it("Should be able to show an user profile", async () => {
    const user = await createUsersUseCase.execute({
      name: "Test",
      email: "test@test.com",
      password: "123",
      isAdmin: true,
    });

    const userProfile = await showUserProfileUseCase.execute(user.id);

    expect(userProfile).toHaveProperty("id");
  });

  it("Should not be able to show a profile for a non-existent user", async () => {
    expect(async () => {
      await showUserProfileUseCase.execute("non_existent_user");
    }).rejects.toBeInstanceOf(ShowUserProfileError);
  });
});
