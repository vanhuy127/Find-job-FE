import { ResumeStatus } from '@/types';

import { IJob } from './job';
import { IUser } from './user';

export interface IResume {
  id: string;
  userId: string;
  jobId: string;
  coverLetter?: string | null;
  resumePath: string;
  status: ResumeStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResumeExtend extends IResume {
  user: IUser;
  job: IJob;
}
