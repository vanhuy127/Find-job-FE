import type { GENDER, JOB_LEVEL, JOB_TYPE, RESUME_STATUS, ROLE, STATUS_ORDER } from '@/constants';

export type Role = (typeof ROLE)[keyof typeof ROLE];

export type Gender = (typeof GENDER)[keyof typeof GENDER];

export type JobType = (typeof JOB_TYPE)[keyof typeof JOB_TYPE];

export type JobLevel = (typeof JOB_LEVEL)[keyof typeof JOB_LEVEL];

export type ResumeStatus = (typeof RESUME_STATUS)[keyof typeof RESUME_STATUS];

export type OrderStatus = (typeof STATUS_ORDER)[keyof typeof STATUS_ORDER];
