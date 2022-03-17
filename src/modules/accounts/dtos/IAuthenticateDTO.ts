import { User } from "../infra/typeorm/entities/User";

export interface IAuthenticateDTO {
  user: Pick<User, "id" | "name" | "email">;
  token: string;
}
