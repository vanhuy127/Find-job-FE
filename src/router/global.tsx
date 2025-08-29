import { lazy } from 'react';

import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/router';
import { BlankLayout } from '@/layout/blank';
import { DefaultLayout } from '@/layout/default';
import Unauthorized from '@/pages/Unauthorized';

const Home = lazy(() => import('@/pages/user/Home'));
const ListJobs = lazy(() => import('@/pages/user/Jobs'));

const GlobalRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [{ path: ROUTE_PATH.USER.HOME, element: <Home /> }, { path: ROUTE_PATH.USER.LIST_JOBS, element: <ListJobs /> }],
  },
  {
    element: <BlankLayout />,
    children: [{ path: ROUTE_PATH.UNAUTHORIZE, element: <Unauthorized /> }],
  },
];

export default GlobalRoutes;
