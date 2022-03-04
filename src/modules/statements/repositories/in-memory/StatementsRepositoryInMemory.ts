import { ICreateStatementDTO } from "@modules/statements/dtos/ICreateStatement";
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
}

export { StatementsRepositoryInMemory };
