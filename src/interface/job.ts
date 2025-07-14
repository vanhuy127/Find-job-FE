import { JobLevel, JobType } from '@/types';

import { ICompany } from './company';
import { IProvince } from './province';
import { ISkill } from './skill';

export interface IJob {
  id: string;
  title: string;
  description: string;
  address: string;
  jobType: JobType;
  level: JobLevel;
  numApplications: number;
  salaryMin: number;
  salaryMax: number;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  province: IProvince;
  company: ICompany;
  _count: {
    applications: number;
  };
  skills: ISkill[];
}
