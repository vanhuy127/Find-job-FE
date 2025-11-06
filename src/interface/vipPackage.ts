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
  companyId: string;
  vipPackageId: string;
  endDate: Date;
  remainingPosts: number;
  createdAt: Date;
}
