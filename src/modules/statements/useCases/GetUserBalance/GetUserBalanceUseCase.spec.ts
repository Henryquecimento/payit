import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/CreateUserUseCase/CreateUserUseCase";
import { OperationType } from "@modules/statements/enums/OperationType";
import { StatementsRepositoryInMemory } from "@modules/statements/repositories/in-memory/StatementsRepositoryInMemory";

import { GetUserBalanceError } from "./GetUserBalanceError";
import { GetUserBalanceUseCase } from "./GetUserBalanceUseCase";

let usersRepositoryInMemory: UserRepositoryInMemory;
let createUsersUseCase: CreateUserUseCase;
let statementsRepositoryInMemory: StatementsRepositoryInMemory;
let getUserBalanceUseCase: GetUserBalanceUseCase;

describe("Get User Balance", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    statementsRepositoryInMemory = new StatementsRepositoryInMemory();
    getUserBalanceUseCase = new GetUserBalanceUseCase(
      statementsRepositoryInMemory,
      usersRepositoryInMemory
    );
  });

  it("Should be able to get user's balance", async () => {
    const user = await createUsersUseCase.execute({
      name: "test",
      email: "test@test.com",
      password: "123",
      isAdmin: true,
    });

    await statementsRepositoryInMemory.create({
      user_id: user.id,
      amount: 120,
      description: "Test with Deposit",
      type: OperationType.DEPOSIT,
    });

    await statementsRepositoryInMemory.create({
      user_id: user.id,
      amount: 100,
      description: "Test with Withdraw",
      type: OperationType.WITHDRAW,
    });

    const balance = await getUserBalanceUseCase.execute({
      user_id: user.id,
    });

    expect(balance).toHaveProperty("statement");
    expect(balance).toHaveProperty("balance");
    expect(balance.balance).toEqual(20);
  });
  it("Should not be able to get balance of a non existent user", () => {
    expect(async () => {
      await statementsRepositoryInMemory.create({
        user_id: "non_existent_user_id",
        amount: 120,
        description: "Test with Deposit",
        type: OperationType.DEPOSIT,
      });

      await statementsRepositoryInMemory.create({
        user_id: "non_existent_user_id",
        amount: 100,
        description: "Test with Withdraw",
        type: OperationType.WITHDRAW,
      });

      await getUserBalanceUseCase.execute({
        user_id: "non_existent_user_id",
      });
    }).rejects.toBeInstanceOf(new GetUserBalanceError());
  });
});
