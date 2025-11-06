//router path
export const ROUTE_PATH = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    REGISTER_COMPANY: '/register-company',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: {
      PATH: '/reset-password/:token',
    },
  },
  USER: {
    ACCOUNT: '/account',
    RESUMES: {
      LIST: '/resume',
      DETAILS: {
        PATH: '/resume/:id',
        LINK: (id: string) => `/resume/${id}`,
      },
    },
    HOME: '/',
    COMPANIES: {
      LIST: '/company',
      DETAILS: {
        PATH: '/company/:id',
        LINK: (id: string) => `/company/${id}`,
      },
    },
    JOBS: {
      LIST: '/job',
      DETAILS: {
        PATH: '/job/:id',
        LINK: (id: string) => `/job/${id}`,
      },
    },
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: {
      LIST: '/admin/user',
    },
    COMPANIES: {
      LIST: '/admin/company',
      DETAILS: {
        PATH: '/admin/company/:id',
        LINK: (id: string) => `/admin/company/${id}`,
      },
      LIST_PENDING: '/admin/pending-company',
      DETAILS_PENDING: {
        PATH: '/admin/pending-company/:id',
        LINK: (id: string) => `/admin/pending-company/${id}`,
      },
    },
    JOBS: {
      LIST: '/admin/job',
      DETAILS: {
        PATH: '/admin/job/:id',
        LINK: (id: string) => `/admin/job/${id}`,
      },
    },
    SKILLS: {
      LIST: '/admin/skill',
      CREATE: '/admin/skill/create',
      EDIT: {
        PATH: '/admin/skill/:id/edit',
        LINK: (id: string) => `/admin/skill/${id}/edit`,
      },
    },
    VIP_PACKAGES: {
      LIST: '/admin/vip-package',
      CREATE: '/admin/vip-package/create',
      EDIT: {
        PATH: '/admin/vip-package/:id/edit',
        LINK: (id: string) => `/admin/vip-package/${id}/edit`,
      },
    },
  },
  COMPANY: {
    DASHBOARD: '/company/dashboard',
    INFO: '/company/info',
    COMPANY_STATUS: '/company-verification-status',
    JOBS: {
      LIST: '/company/job',
      DETAILS: {
        PATH: '/company/job/:id',
        LINK: (id: string) => `/company/job/${id}`,
      },
      CREATE: '/company/job/create',
      EDIT: {
        PATH: '/company/job/:id/edit',
        LINK: (id: string) => `/company/job/${id}/edit`,
      },
    },
    RESUMES: {
      LIST: '/company/resume',
      DETAILS: {
        PATH: '/company/resume/:id',
        LINK: (id: string) => `/company/resume/${id}`,
      },
    },
  },
  NOT_FOUND: '*',
  UNAUTHORIZE: '/unauthorized',
};
