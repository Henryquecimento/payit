import { getRepository, Repository } from "typeorm";

import { ICreateStatementDTO } from "@modules/statements/dtos/ICreateStatement";
import { IGetBalanceDTO } from "@modules/statements/dtos/IGetBalanceDTO";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRepository";

import { Statement } from "../entities/Statement";

class StatementsRepository implements IStatementRepository {
  repository: Repository<Statement>;

  constructor() {
    this.repository = getRepository(Statement);
  }

  async create({
    user_id,
    amount,
    description,
    type,
  }: ICreateStatementDTO): Promise<Statement> {
    const statement = this.repository.create({
      user_id,
      amount,
      description,
      type,
    });

    await this.repository.save(statement);

    return statement;
  }

  async getUserBalance({
    user_id,
    with_statement,
  }: IGetBalanceDTO): Promise<
    { balance: number } | { balance: number; statement: Statement[] }
  > {
    const statement = await this.repository.find({
      where: { user_id },
    });

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
}

export { StatementsRepository };
