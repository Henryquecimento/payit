import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateStatementDTO } from "@modules/statements/dtos/ICreateStatement";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRepository";

import { CreateStatementError } from "./CreateStatementError";

@injectable()
class CreateStatementUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StatementsRepository")
    private statementsRepository: IStatementRepository
  ) {}

  async execute({ user_id, amount, description, type }: ICreateStatementDTO) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new CreateStatementError.UserNotFound();

    if (type === "withdraw") {
      const { balance } = await this.statementsRepository.getUserBalance({
        user_id,
      });

      if (balance < amount) throw new CreateStatementError.InsufficientFunds();
    }

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
