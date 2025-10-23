//endpoint api
export const END_POINT = {
  AUTH: {
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CHECK_AVAILABLE_TOKEN: (token: string) => `/auth/forgot-password/${token}`,
    RESET_PASSWORD: '/auth/reset-password',
    LOGOUT: '/auth/logout',
    LOCK: '/auth/lock-account',
    UNLOCK: '/auth/unlock-account',
  },
  PROVINCE: {
    GET_ALL: '/provinces',
  },
  USER: {
    COMPANIES: {
      LIST: '/companies',
      DETAILS: (id: string) => `/company/${id}`,
      CURRENT_JOBS: (id: string) => `/company/${id}/jobs`,
    },
    JOBS: {
      LIST: '/jobs',
      DETAILS: (id: string) => `/job/${id}`,
      LIST_RESUMES_APPLIED_CURRENT: (id: string) => `/job/${id}/current-resumes`,
    },
    RESUMES: {
      LIST_USER_APPLIED: '/resumes/current-user',
      GET_BY_ID: (id: string) => `/resume/${id}/current-user`,
    },
  },
  ADMIN: {
    USER: {
      GET_ALL: '/admin/users',
    },
    COMPANIES: {
      LIST: '/admin/companies',
      LIST_PENDING: '/admin/companies/pending',
      DETAILS: (id: string) => `/admin/company/${id}`,
      DETAILS_PENDING: (id: string) => `/admin/company/pending/${id}`,
      CHANGE_STATUS: (id: string) => `/admin/company/${id}/change-status`,
    },
    JOBS: {
      LIST: '/admin/jobs',
      DETAILS: (id: string) => `/admin/job/${id}`,
    },
    SKILL: {
      GET_ALL: '/admin/skills',
      CREATE: '/admin/skill',
      GET_BY_ID: (id: string) => `/admin/skill/${id}`,
      EDIT: (id: string) => `/admin/skill/${id}`,
      DELETE: (id: string) => `/admin/skill/${id}`,
    },
  },
  COMPANY: {
    JOBS: {
      LIST_CURRENT_COMPANY: '/company/jobs/current-company',
      CREATE: '/company/job',
      GET_BY_ID: (id: string) => `/company/job/${id}`,
      EDIT: (id: string) => `/company/job/${id}`,
      DELETE: (id: string) => `/company/job/${id}`,
    },
    RESUMES: {
      LIST: '/resumes',
      GET_BY_ID: (id: string) => `/resume/${id}`,
      CHANGE_STATUS: (id: string) => `/resume/${id}/change-status`,
      UPLOAD_CV: 'upload-resume',
    },
  },
};
