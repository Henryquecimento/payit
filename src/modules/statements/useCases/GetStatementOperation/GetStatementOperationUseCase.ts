import { inject } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRepository";

interface IRequest {
  user_id: string;
  statement_id: string;
}

class GetStatementOperationUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("StatementsRepository")
    private statementsRepository: IStatementRepository
  ) {}

  async execute({ user_id, statement_id }: IRequest) {
    // const user = await this.usersRepository.findById(user_id);

    // if (!user) throw new GetStatementperationError

    const statementOperation =
      await this.statementsRepository.findStatementOperation({
        user_id,
        statement_id,
      });

    return statementOperation;
  }
}

export { GetStatementOperationUseCase };
