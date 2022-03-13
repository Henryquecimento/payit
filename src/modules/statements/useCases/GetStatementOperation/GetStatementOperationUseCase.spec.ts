import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/CreateUserUseCase/CreateUserUseCase";
import { OperationType } from "@modules/statements/enums/OperationType";
import { StatementsRepositoryInMemory } from "@modules/statements/repositories/in-memory/StatementsRepositoryInMemory";

import { CreateStatementUseCase } from "../CreateStatement/CreateStatementUseCase";
import { GetStatementOperationError } from "./GetStatementOperationError";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let usersRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let statementsRepositoryInMemory: StatementsRepositoryInMemory;
let createStatementUseCase: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe("Get Statement Operation", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    statementsRepositoryInMemory = new StatementsRepositoryInMemory();
    createStatementUseCase = new CreateStatementUseCase(
      usersRepositoryInMemory,
      statementsRepositoryInMemory
    );
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      usersRepositoryInMemory,
      statementsRepositoryInMemory
    );
  });

  it("Should be able to show an statement operation", async () => {
    const user = await createUserUseCase.execute({
      name: "Test",
      password: "1234",
      email: "test@@test.com",
      isAdmin: true,
    });

    const statement = await createStatementUseCase.execute({
      user_id: user.id,
      amount: 100,
      description: "Deposit Test",
      type: OperationType.DEPOSIT,
    });

    const statementOperation = await getStatementOperationUseCase.execute({
      user_id: user.id,
      statement_id: statement.id,
    });

    expect(statementOperation).toHaveProperty("id");
    expect(statementOperation.type).toEqual("deposit");
  });

  it("Should not be able to show an statement operation of a non-existent", () => {
    expect(async () => {
      await getStatementOperationUseCase.execute({
        user_id: "non_existing_user_id",
        statement_id: "non_existing_statement_id",
      });
    }).rejects.toBeInstanceOf(GetStatementOperationError);
  });
});
