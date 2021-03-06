import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/CreateUserUseCase/CreateUserUseCase";
import { OperationType } from "@modules/statements/enums/OperationType";
import { StatementsRepositoryInMemory } from "@modules/statements/repositories/in-memory/StatementsRepositoryInMemory";

import { CreateStatementError } from "./CreateStatementError";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let usersRepositoryInMemory: UserRepositoryInMemory;
let createUsersUseCase: CreateUserUseCase;
let statementsRepositoryInMemory: StatementsRepositoryInMemory;
let createStatementUseCase: CreateStatementUseCase;

describe("Create Statement", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    statementsRepositoryInMemory = new StatementsRepositoryInMemory();
    createStatementUseCase = new CreateStatementUseCase(
      usersRepositoryInMemory,
      statementsRepositoryInMemory
    );
  });

  it("Should not be able to create a statement if user does not exists", () => {
    expect(async () => {
      await createStatementUseCase.execute({
        user_id: "non_existent_user_id",
        amount: 50,
        description: "Deposit Test",
        type: OperationType.DEPOSIT,
      });
    }).rejects.toBeInstanceOf(CreateStatementError.UserNotFound);
  });

  it("Should be able to create a statement of type Deposit", async () => {
    const user = await createUsersUseCase.execute({
      name: "Test2",
      password: "1234",
      email: "test1@test.com",
      isAdmin: true,
    });

    const statement = await createStatementUseCase.execute({
      user_id: user.id,
      amount: 50,
      description: "Deposit Test",
      type: OperationType.DEPOSIT,
    });

    expect(statement).toHaveProperty("id");
    expect(statement.type).toEqual("deposit");
  });

  it("Should be able to create a statement of type Withdraw", async () => {
    const user = await createUsersUseCase.execute({
      name: "Test2",
      password: "1234",
      email: "test2@test.com",
      isAdmin: true,
    });

    await createStatementUseCase.execute({
      user_id: user.id,
      amount: 100,
      description: "Deposit Test 2",
      type: OperationType.DEPOSIT,
    });

    const statement = await createStatementUseCase.execute({
      user_id: user.id,
      amount: 50,
      description: "Withdraw Test",
      type: OperationType.WITHDRAW,
    });

    expect(statement).toHaveProperty("id");
    expect(statement.type).toEqual("withdraw");
  });

  it("Should not be able to create a statement if the fund is insufficient", () => {
    expect(async () => {
      const user = await createUsersUseCase.execute({
        name: "Test2",
        password: "1234",
        email: "test2@test.com",
        isAdmin: true,
      });

      await createStatementUseCase.execute({
        user_id: user.id,
        amount: 100,
        description: "Deposit Test 2",
        type: OperationType.DEPOSIT,
      });

      await createStatementUseCase.execute({
        user_id: user.id,
        amount: 150,
        description: "Withdraw Test",
        type: OperationType.WITHDRAW,
      });
    }).rejects.toBeInstanceOf(CreateStatementError.InsufficientFunds);
  });
});
