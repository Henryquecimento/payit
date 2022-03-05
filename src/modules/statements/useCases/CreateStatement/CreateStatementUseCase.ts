import { inject, injectable } from "tsyringe";

import { ICreateStatementDTO } from "@modules/statements/dtos/ICreateStatement";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRepository";

@injectable()
class CreateStatementUseCase {
  constructor(
    @inject("StatementsRepository")
    private statementsRepository: IStatementRepository
  ) {}

  async execute({ user_id, amount, description, type }: ICreateStatementDTO) {
    const statement = await this.statementsRepository.create({
      user_id,
      amount,
      description,
      type,
    });

    return statement;
  }
}

export { CreateStatementUseCase };
