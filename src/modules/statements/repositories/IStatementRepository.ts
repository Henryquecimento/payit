import { ICreateStatementDTO } from "../dtos/ICreateStatement";
import { IGetBalanceDTO } from "../dtos/IGetBalanceDTO";
import { IGetStatementOperationDTO } from "../dtos/IGetStatementDTO";
import { Statement } from "../infra/typeorm/entities/Statement";

interface IStatementRepository {
  create(data: ICreateStatementDTO): Promise<Statement>;
  getUserBalance(
    data: IGetBalanceDTO
  ): Promise<{ balance: number } | { balance: number; statement: Statement[] }>;
  findStatementOperation(
    data: IGetStatementOperationDTO
  ): Promise<Statement | undefined>;
}

export { IStatementRepository };
