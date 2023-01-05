export class LoginModel {
  public email!: string;
  public password!: string;
}

export interface User {
  company_name: string;
  company_logo: string;
  name: string;
  email: string;
}


export interface loginResponse {
  activation_code: string;
  client_uuid: string;
  company_logo: string;
  company_name: string;
  created_at: string;
  deleted_at: string;
  email: string;
  id: string;
  is_active: boolean;
  last_login: string;
  name: string;
  password: string;
  slug: string;
  status: boolean;
  updated_at: string;
  uuid: string;
  verified_at: string;
}

export interface CurrentUser {
  userName: string;
  email: string;
}
