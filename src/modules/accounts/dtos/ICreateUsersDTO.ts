interface ICreateUsersDTO {
  name: string;
  password: string;
  email: string;
  isAdmin?: boolean;
}

export { ICreateUsersDTO };
