import { ICreateStatementDTO } from "../dtos/ICreateStatement";
import { Statement } from "../infra/typeorm/entities/Statement";

interface IStatementRepository {
  create(data: ICreateStatementDTO): Promise<Statement>;
}

export { IStatementRepository };
