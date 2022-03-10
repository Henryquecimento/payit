import { ICreateStatementDTO } from "@modules/statements/dtos/ICreateStatement";
import { IGetBalanceDTO } from "@modules/statements/dtos/IGetBalanceDTO";
import { IGetStatementOperationDTO } from "@modules/statements/dtos/IGetStatementDTO";
import { Statement } from "@modules/statements/infra/typeorm/entities/Statement";

import { IStatementRepository } from "../IStatementRepository";

class StatementsRepositoryInMemory implements IStatementRepository {
  statements: Statement[] = [];

  async create({
    user_id,
    amount,
    description,
    type,
  }: ICreateStatementDTO): Promise<Statement> {
    const statement = new Statement();

    Object.assign(statement, {
      user_id,
      amount,
      description,
      type,
    });

    this.statements.push(statement);

    return statement;
  }

  async getUserBalance({
    user_id,
    with_statement,
  }: IGetBalanceDTO): Promise<
    { balance: number } | { balance: number; statement: Statement[] }
  > {
    const statement = this.statements.filter(
      (operation) => operation.user_id === user_id
    );

    const balance = statement.reduce((inAccount, operation) => {
      if (operation.type === "deposit") {
        return Number(inAccount + operation.amount);
        // eslint-disable-next-line no-else-return
      } else {
        return Number(inAccount - operation.amount);
      }
    }, 0);

    if (with_statement) {
      return {
        statement,
        balance,
      };
    }

    return { balance };
  }

  async findStatementOperation({
    user_id,
    statement_id,
  }: IGetStatementOperationDTO): Promise<Statement | undefined> {
    return this.statements.find(
      (operation) =>
        operation.id === statement_id && operation.user_id === user_id
    );
  }
}

export { StatementsRepositoryInMemory };
