import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(user_id: string): Promise<User>;
}

export { IUsersRepository };
