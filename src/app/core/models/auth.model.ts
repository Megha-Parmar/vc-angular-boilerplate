export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  uuid: string;
  name: string;
  email: string;
  isPasswordReset?: boolean;
  role: string;
  companyName?: string;
  locale: string;
  currency: string;
}