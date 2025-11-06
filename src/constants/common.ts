export const LOCAL_STORAGE_KEY = {
  LANGUAGE: 'language',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  THEME: 'theme',
};

export const SYSTEM_ERROR = {
  SERVER_ERROR: {
    STATUS: 'Server Error',
    MESSAGE: 'Unable to connect to the server. Please try again later.',
  },

  NETWORK_ERROR: {
    STATUS: 'Network Error',
    MESSAGE: 'Request has been cancelled',
  },

  TIMEOUT_ERROR: {
    STATUS: 'Request Timeout',
    MESSAGE: 'The request has timed out',
  },
};

export const MAX_PAGE_SIZE = 10000000;
export const MAX_PAGE_SHOW = 7;
export const DEFAULT_TIME_ZONE = 'Asia/Bangkok';
export const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  COMPANY: 'COMPANY',
};

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
};

export const GENDER_ARRAY = Object.values(GENDER);

export const GENDER_SHOWS = {
  [GENDER.MALE]: 'Nam',
  [GENDER.FEMALE]: 'Nữ',
  [GENDER.OTHER]: 'Khác',
};

export const RESUME_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const RESUME_STATUS_ARRAY = Object.values(RESUME_STATUS);

export const RESUME_STATUS_SHOWS = {
  [RESUME_STATUS.PENDING]: 'PENDING',
  [RESUME_STATUS.APPROVED]: 'APPROVED',
  [RESUME_STATUS.REJECTED]: 'REJECTED',
};

export const JOB_TYPE = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  INTERNSHIP: 'INTERNSHIP',
  FREELANCE: 'FREELANCE',
  REMOTE: 'REMOTE',
};

export const JOB_TYPE_ARRAY = Object.values(JOB_TYPE);

export const JOB_TYPE_SHOWS = {
  [JOB_TYPE.FULL_TIME]: 'Full time',
  [JOB_TYPE.PART_TIME]: 'Part time',
  [JOB_TYPE.INTERNSHIP]: 'Internship',
  [JOB_TYPE.FREELANCE]: 'Freelance',
  [JOB_TYPE.REMOTE]: 'Remote',
};

export const JOB_LEVEL = {
  INTERN: 'INTERN',
  FRESHER: 'FRESHER',
  JUNIOR: 'JUNIOR',
  MID: 'MID',
  SENIOR: 'SENIOR',
  LEAD: 'LEAD',
};

export const JOB_LEVEL_ARRAY = Object.values(JOB_LEVEL);

export const JOB_LEVEL_SHOWS = {
  [JOB_LEVEL.INTERN]: 'Intern',
  [JOB_LEVEL.FRESHER]: 'Fresher',
  [JOB_LEVEL.JUNIOR]: 'Junior',
  [JOB_LEVEL.MID]: 'Mid',
  [JOB_LEVEL.SENIOR]: 'Senior',
  [JOB_LEVEL.LEAD]: 'Lead',
};

export const VIP_PACKAGE_LEVEL: Record<string, string> = {
  BASIC: 'BASIC',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM',
  DIAMOND: 'DIAMOND',
};

export const VIP_PACKAGE_LEVEL_NUMERIC: Record<number, string> = {
  0: 'BASIC',
  1: 'SILVER',
  2: 'GOLD',
  3: 'PLATINUM',
  4: 'DIAMOND',
};

export const VIP_PACKAGE_LEVEL_SHOWS = {
  [VIP_PACKAGE_LEVEL.BASIC]: 'Basic',
  [VIP_PACKAGE_LEVEL.SILVER]: 'Silver',
  [VIP_PACKAGE_LEVEL.GOLD]: 'Gold',
  [VIP_PACKAGE_LEVEL.PLATINUM]: 'Platinum',
  [VIP_PACKAGE_LEVEL.DIAMOND]: 'Diamond',
};

export const VIP_PACKAGE_LEVEL_ARRAY = Object.values(VIP_PACKAGE_LEVEL);
