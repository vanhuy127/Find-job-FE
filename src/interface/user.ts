import type { Gender, Role } from '@/types';

export interface IUserAccount {
  id: string;
  email: string;
  role: Role;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone: string;
  dob: Date;
  address: string;
  gender: Gender;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
  account: { isLocked: boolean };
}
