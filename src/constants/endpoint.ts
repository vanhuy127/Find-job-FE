//endpoint api
export const END_POINT = {
  AUTH: {
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    LOCK: '/auth/lock-account',
    UNLOCK: '/auth/unlock-account',
  },
  PROVINCE: {
    GET_ALL: '/provinces',
  },
  ADMIN: {
    USER: {
      GET_ALL: '/admin/users',
    },
    COMPANIES: {
      LIST: '/admin/companies',
      DETAILS: (id: string) => `/admin/company/${id}`,
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
      LIST: '/company/resumes',
      GET_BY_ID: (id: string) => `/company/resume/${id}`,
      CHANGE_STATUS: (id: string) => `/company/resume/${id}/change-status`,
    },
  },
};
