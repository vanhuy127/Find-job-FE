import { lazy } from 'react';

import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/router';
import { BlankLayout } from '@/layout/blank';
import { DefaultLayout } from '@/layout/default';

const Home = lazy(() => import('@/pages/user/Home'));
const ListJobs = lazy(() => import('@/pages/user/Jobs'));
const ListCompanies = lazy(() => import('@/pages/user/Companies'));
const CompanyDetails = lazy(() => import('@/pages/user/CompanyDetails'));
const JobDetails = lazy(() => import('@/pages/user/JobDetails'));

const Unauthorized = lazy(() => import('@/pages/Unauthorized'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const GlobalRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [{ path: ROUTE_PATH.USER.HOME, element: <Home /> },
    { path: ROUTE_PATH.USER.JOBS.LIST, element: <ListJobs /> },
    { path: ROUTE_PATH.USER.COMPANIES.LIST, element: <ListCompanies /> },
    { path: ROUTE_PATH.USER.COMPANIES.DETAILS.PATH, element: <CompanyDetails /> },
    { path: ROUTE_PATH.USER.JOBS.DETAILS.PATH, element: <JobDetails /> },
    ],
  },
  {
    element: <BlankLayout />,
    children: [{ path: ROUTE_PATH.UNAUTHORIZE, element: <Unauthorized /> },
    { path: ROUTE_PATH.NOT_FOUND, element: <NotFound /> }],
  },
];

export default GlobalRoutes;
