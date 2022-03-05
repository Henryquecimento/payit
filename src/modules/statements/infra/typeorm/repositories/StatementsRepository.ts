import { getRepository, Repository } from "typeorm";

import { ICreateStatementDTO } from "@modules/statements/dtos/ICreateStatement";
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
}

export { StatementsRepository };
