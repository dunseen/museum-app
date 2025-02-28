export type Role = {
  id: number | string;
  name: string;
};

export type Status = {
  id: number | string;
  name?: string;
};

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  status: Status;
}
