import { TFunction } from 'i18next';
import { Typography } from '@mui/material';

import { RoutesType } from './types/routes.types';


import { LazyExoticComponent, Suspense, lazy } from 'react';


import { SuspenseLoader } from '@/components/suspense-loader/suspense-loader';
import { JSX } from 'react/jsx-runtime';
import { Role } from '@/providers/roles.enum';

const Loader = (Component: LazyExoticComponent<() => JSX.Element>) => (props: JSX.IntrinsicAttributes) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Dashboards

const Dashhboard = Loader(lazy(() => import('@/pages/Home.page')));

// Persons

const UsersList = Loader(
  lazy(() => import('@/modules/Users/pages/Users.page'))
);


const LabWorkersList = Loader(
  lazy(() => import('@/modules/LabWorkers/pages/LabWorkers.page'))
);


// Samples & Status

const Samples = Loader(
  lazy(() => import('@/modules/Samples/pages/Samples.page'))
);

const SampleDetails = Loader(
  lazy(() => import('@/modules/Samples/pages/SampleDetails.page'))
);

// Buildings

const Buildings = Loader(lazy(() => import('@/modules/Buildings/pages/Buildings.page')));

// Errors Handling

export const Status404 = Loader(
  lazy(() => import('@/pages/status/status-404/status-404'))
);
export const Status500 = Loader(
  lazy(() => import('@/pages/status/status-500/status-500'))
);

export const routes = (t: TFunction): RoutesType[] => {
  return [
    {
      name: t('sidebar.dashboard'),
      element: <Dashhboard />,
      path: '/',
      icon: <Typography sx={{ fontFamily: 'FontAwesome', fontSize: '22px' }}>{'\ue50d'}</Typography>,
      showInMenu: true,
    },
    {
      name: t('sidebar.buildings'),
      element: <Buildings />,
      path: '/buildings',
      icon: <Typography sx={{ fontFamily: 'FontAwesome', fontSize: '22px' }}>{'\uf0f8'}</Typography>,
      showInMenu: true,
      accessRoles: [Role.admin, Role.user],
    },
    {
      name: t('sidebar.labWorkers'),
      element: <LabWorkersList />,
      path: '/lab-workers',
      icon: <Typography sx={{ fontFamily: 'FontAwesome', fontSize: '22px' }}>{'\uf0f0'}</Typography>,
      showInMenu: true,
      accessRoles: [Role.admin, Role.user],
    },
    {
      name: t('sidebar.samples'),
      element: <Samples />,
      path: '/samples',
      icon: <Typography sx={{ fontFamily: 'FontAwesome', fontSize: '22px' }}>{'\uf493'}</Typography>,
      showInMenu: true,
      accessRoles: [Role.noAuth, Role.admin, Role.user]
    },
    {
      name: t('sidebar.sampleDetails'),
      element: <SampleDetails />,
      path: '/samples/:uid',
      icon: <Typography sx={{ fontFamily: 'FontAwesome', fontSize: '22px' }}>{'\uf493'}</Typography>,
      showInMenu: false,
      accessRoles: [Role.admin, Role.user],
    },
    {
      name: t('sidebar.users'),
      element: <UsersList />,
      path: '/users',
      icon: <Typography sx={{ fontFamily: 'FontAwesome', fontSize: '22px' }}>{'\uf500'}</Typography>,
      showInMenu: true,
      accessRoles: [Role.admin],
    },
  ]
};