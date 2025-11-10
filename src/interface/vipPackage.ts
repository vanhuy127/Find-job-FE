import { OrderStatus } from '@/types';

import { ICompany } from './company';

export interface IVipPackage {
  id: string;
  name: string;
  description?: string | null;
  numPost: number;
  price: number;
  durationDay: number;
  priority: number; // 0 = BASIC, 1 = SILVER, 2 = GOLD, 3 = PLATINUM, 4 = DIAMOND
  createdAt: Date;
  isDeleted: boolean;
}

export interface ICompanyVipPackage {
  id: string;
  endDate: Date;
  status: OrderStatus;
  remainingPosts: number;
  createdAt: Date;
  vipPackage: IVipPackage;
  company: ICompany;
}
