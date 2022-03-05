import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { StatementsRepository } from "@modules/statements/infra/typeorm/repositories/StatementsRepository";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IStatementRepository>(
  "StatementsRepository",
  StatementsRepository
);
