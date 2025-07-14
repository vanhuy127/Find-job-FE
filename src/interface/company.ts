import { IProvince } from './province';

export interface ICompany {
  id: string;
  email: string;
  name: string;
  description: string;
  address: string;
  province: IProvince;
  website: string;
  logo: string;
  taxCode: string;
  businessLicensePath: string;
  status: number; // 0: rejected, 1: approved, -1: pending,
  reasonReject: string | null;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  account: {
    isLocked: boolean;
  };
}
