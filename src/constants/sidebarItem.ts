import { Briefcase, Building, Building2, FileUser, LayoutDashboard, Lightbulb, Users } from 'lucide-react';

import { ROUTE_PATH } from './router';

export const adminNavigationItems = [
  {
    title: 'Thống kê',
    url: ROUTE_PATH.ADMIN.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: 'Người dùng',
    url: ROUTE_PATH.ADMIN.USERS.LIST,
    icon: Users,
  },
  {
    title: 'Công ty',
    url: ROUTE_PATH.ADMIN.COMPANIES.LIST,
    icon: Building,
  },
  {
    title: 'Việc làm',
    url: ROUTE_PATH.ADMIN.JOBS.LIST,
    icon: Briefcase,
  },
  {
    title: 'Kỹ năng',
    url: ROUTE_PATH.ADMIN.SKILLS.LIST,
    icon: Lightbulb,
  },
  {
    title: 'Duyệt công ty',
    url: ROUTE_PATH.ADMIN.COMPANIES.LIST_PENDING,
    icon: Building2,
  },
];

export const companyNavigationItems = [
  {
    title: 'Thống kê',
    url: ROUTE_PATH.COMPANY.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: 'Công ty',
    url: ROUTE_PATH.COMPANY.INFO,
    icon: Briefcase,
  },
  {
    title: 'Việc làm',
    url: ROUTE_PATH.COMPANY.JOBS.LIST,
    icon: Briefcase,
  },
  {
    title: 'Đơn ứng tuyển',
    url: ROUTE_PATH.COMPANY.RESUMES.LIST,
    icon: FileUser,
  },
];
