export class LoginModel {
  public email!: string;
  public password!: string;
}

export interface CurrentUser {
  userName: string;
  email: string;
}


export interface APIResponse<T> {
  code: number;
  data: T;
  error: T;
  message: string;
}
