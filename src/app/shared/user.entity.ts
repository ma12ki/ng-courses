export interface IUserCredentials {
  login: string;
  password: string;
}

export interface IUser {
  id: number;
  login: string;
  roles: [string];
}

export interface IUserAndToken {
  user: IUser;
  token: string;
}
