import React, { lazy } from 'react';

import { Navigate, type RouteObject, useLocation } from 'react-router-dom';

import { ROLE } from '@/constants';
import { ROUTE_PATH } from '@/constants/router';
import { AdminLayout } from '@/layout/admin';
import { DefaultLayout } from '@/layout/default';
import { useAuthStore } from '@/store';

//user page
const Account = lazy(() => import('@/pages/user/Account'));
const Resumes = lazy(() => import('@/pages/user/resumes'));
const ResumeDetails = lazy(() => import('@/pages/user/resumes/Details'));

//admin page
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const ListUsers = lazy(() => import('@/pages/admin/user'));
const ListCompanies = lazy(() => import('@/pages/admin/company'));
const CompanyDetails = lazy(() => import('@/pages/admin/company/Details'));
const ListJobs = lazy(() => import('@/pages/admin/job'));
const JobDetails = lazy(() => import('@/pages/admin/job/Details'));
const ListSkills = lazy(() => import('@/pages/admin/skill'));
const CreateSkill = lazy(() => import('@/pages/admin/skill/Create'));
const EditSkill = lazy(() => import('@/pages/admin/skill/Edit'));
const ListCompaniesPending = lazy(() => import('@/pages/admin/companyPending/index'));
const CompanyPendingDetails = lazy(() => import('@/pages/admin/companyPending/Details'));
const ListVipPackages = lazy(() => import('@/pages/admin/vipPackage'));
const CreateVipPackage = lazy(() => import('@/pages/admin/vipPackage/Create'));
const EditVipPackage = lazy(() => import('@/pages/admin/vipPackage/Edit'));


//company page
const CompanyDashboard = lazy(() => import('@/pages/company/Dashboard'));
const CompanyInfo = lazy(() => import('@/pages/company/companyInfo'));
const CompanyJob = lazy(() => import('@/pages/company/job'));
const CompanyJobDetails = lazy(() => import('@/pages/company/job/Details'));
const CompanyCreateJob = lazy(() => import('@/pages/company/job/Create'));
const CompanyEditJob = lazy(() => import('@/pages/company/job/Edit'));
const CompanyResume = lazy(() => import('@/pages/company/resume'));
const CompanyResumeDetails = lazy(() => import('@/pages/company/resume/Details'));
const CompanyListVipPackages = lazy(() => import('@/pages/company/vipPackage'));
const CompanyVipPackagesCheckout = lazy(() => import('@/pages/company/vipPackage/checkout'));

const PrivateRoute = React.memo(({ children, roles }: { children: React.ReactNode; roles?: string[] }) => {
  const { user } = useAuthStore();
  const location = useLocation();
  if (!user) return <Navigate to={ROUTE_PATH.AUTH.LOGIN} state={{ from: location }} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to={ROUTE_PATH.UNAUTHORIZE} replace />;

  return <>{children}</>;
});

PrivateRoute.displayName = 'PrivateRoute';

const PrivateRoutes: RouteObject[] = [
  {
    element: (
      <PrivateRoute roles={[ROLE.USER]}>
        <DefaultLayout />
      </PrivateRoute>
    ),
    children: [
      { path: ROUTE_PATH.USER.ACCOUNT, element: <Account /> },
      { path: ROUTE_PATH.USER.RESUMES.LIST, element: <Resumes /> },
      { path: ROUTE_PATH.USER.RESUMES.DETAILS.PATH, element: <ResumeDetails /> },
    ],
  },
  {
    element: (
      <PrivateRoute roles={[ROLE.ADMIN]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { path: ROUTE_PATH.ADMIN.DASHBOARD, element: <Dashboard /> },
      { path: ROUTE_PATH.ADMIN.USERS.LIST, element: <ListUsers /> },
      { path: ROUTE_PATH.ADMIN.COMPANIES.LIST, element: <ListCompanies /> },
      { path: ROUTE_PATH.ADMIN.COMPANIES.DETAILS.PATH, element: <CompanyDetails /> },
      { path: ROUTE_PATH.ADMIN.JOBS.LIST, element: <ListJobs /> },
      { path: ROUTE_PATH.ADMIN.JOBS.DETAILS.PATH, element: <JobDetails /> },
      { path: ROUTE_PATH.ADMIN.SKILLS.LIST, element: <ListSkills /> },
      { path: ROUTE_PATH.ADMIN.SKILLS.CREATE, element: <CreateSkill /> },
      { path: ROUTE_PATH.ADMIN.SKILLS.EDIT.PATH, element: <EditSkill /> },
      { path: ROUTE_PATH.ADMIN.COMPANIES.LIST, element: <ListCompanies /> },
      { path: ROUTE_PATH.ADMIN.COMPANIES.LIST_PENDING, element: <ListCompaniesPending /> },
      { path: ROUTE_PATH.ADMIN.COMPANIES.DETAILS_PENDING.PATH, element: <CompanyPendingDetails /> },
      { path: ROUTE_PATH.ADMIN.VIP_PACKAGES.LIST, element: <ListVipPackages /> },
      { path: ROUTE_PATH.ADMIN.VIP_PACKAGES.CREATE, element: <CreateVipPackage /> },
      { path: ROUTE_PATH.ADMIN.VIP_PACKAGES.EDIT.PATH, element: <EditVipPackage /> },
    ],
  },
  {
    element: (
      <PrivateRoute roles={[ROLE.COMPANY]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { path: ROUTE_PATH.COMPANY.DASHBOARD, element: <CompanyDashboard /> },
      { path: ROUTE_PATH.COMPANY.INFO, element: <CompanyInfo /> },
      { path: ROUTE_PATH.COMPANY.JOBS.LIST, element: <CompanyJob /> },
      { path: ROUTE_PATH.COMPANY.JOBS.DETAILS.PATH, element: <CompanyJobDetails /> },
      { path: ROUTE_PATH.COMPANY.JOBS.CREATE, element: <CompanyCreateJob /> },
      { path: ROUTE_PATH.COMPANY.JOBS.EDIT.PATH, element: <CompanyEditJob /> },
      { path: ROUTE_PATH.COMPANY.RESUMES.LIST, element: <CompanyResume /> },
      { path: ROUTE_PATH.COMPANY.RESUMES.DETAILS.PATH, element: <CompanyResumeDetails /> },
      { path: ROUTE_PATH.COMPANY.VIP_PACKAGE.LIST, element: <CompanyListVipPackages /> },
      { path: ROUTE_PATH.COMPANY.ORDER.CHECKOUT.PATH, element: <CompanyVipPackagesCheckout /> },
    ],
  },
];

export default PrivateRoutes;
