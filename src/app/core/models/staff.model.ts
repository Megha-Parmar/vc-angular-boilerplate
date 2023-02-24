export interface StaffListModel {
  title: string;
}

export interface StaffRoleModel {
  id: number;
  name: string;
  email: string;
  password: string;
  status: string;
  created_at: string;
  updated_at: string;
  role: string;
  uuid: string;
  client_uuid: string;
}

export interface StaffModel {
  name: string;
  email: string;
  role: string;
  uuid?: string;
  client_uuid?: string;
  role_uuid?: string;
  is_active?: boolean;
}
