export interface LoginModel {
  email: string;
  password: string;
}

export interface User {
  _id: string | number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface LoginUserModel {
  email: string;
  password: string;
}

export interface APIResponse<T> {
  code: number;
  data: T;
  error: T;
  message: string;
}

export interface CurrentUser {
  userName: string;
  email: string;
  profilePicUrl: File;
  isAvtar: string;
  organizationName: string;
  subscriptionType: SubscriptionType;
  fotowareDam: FotowareDam;
  subscriptionExpireDate: string;
  isActiveUser: string;
  countryOfOrigin: string;
}

export interface SubscriptionType {
  subscription_type: string;
  subscription_duration: number;
  plan_name: string;
  subscription_price: string;
  isActiveSubscription: boolean;
}

export interface FotowareDam {
  clientId: string;
  clientSecret: string;
  fotowareDamURL: string;
  allArchivesURL: string;
}