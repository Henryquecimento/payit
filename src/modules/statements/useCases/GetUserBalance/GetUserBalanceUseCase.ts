import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Statement } from "@modules/statements/infra/typeorm/entities/Statement";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRepository";

import { GetUserBalanceError } from "./GetUserBalanceError";

interface IRequest {
  user_id: string;
}

interface IResponse {
  statement: Statement[];
  balance: number;
}

@injectable()
class GetUserBalanceUseCase {
  constructor(
    @inject("StatementsRepository")
    private statementsRepository: IStatementRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new GetUserBalanceError();

    const balace = await this.statementsRepository.getUserBalance({
      user_id,
      with_statement: true,
    });

    return balace as IResponse;
  }
}

export { GetUserBalanceUseCase };
