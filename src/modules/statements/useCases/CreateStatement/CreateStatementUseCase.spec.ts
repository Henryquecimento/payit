import { OperationType } from "@modules/statements/enums/OperationType";
import { StatementsRepositoryInMemory } from "@modules/statements/repositories/in-memory/StatementsRepositoryInMemory";

import { CreateStatementUseCase } from "./CreateStatementUseCase";

let statementsRepositoryInMemory: StatementsRepositoryInMemory;
let createStatementUseCase: CreateStatementUseCase;

describe("Create Statement", () => {
  beforeAll(() => {
    statementsRepositoryInMemory = new StatementsRepositoryInMemory();
    createStatementUseCase = new CreateStatementUseCase(
      statementsRepositoryInMemory
    );
  });

  it("Create a Statement of Type Deposit", async () => {
    const statement = await createStatementUseCase.execute({
      user_id: "1",
      amount: 50,
      description: "Deposit Test",
      type: OperationType.DEPOSIT,
    });

    expect(statement).toHaveProperty("id");
    expect(statement.type).toEqual("deposit");
  });
});
