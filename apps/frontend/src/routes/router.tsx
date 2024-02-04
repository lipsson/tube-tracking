import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';


import { routes } from './routes';
import { Layout } from '@/layout/layout';
import { useAuthState } from '@/auth';

export const Router: FC = () => {
  const { user } = useAuthState();
  const { t } = useTranslation();

  return (
    <Routes>
      <Route element={<Layout />}>
        {routes(t)
          .filter((filter) => user !== null ? filter : filter.accessRoles === undefined)
          .map((route) => (
            <Route index={route.index} key={route.path} path={route.path} element={route.element} />
          ))}
      </Route>
      <Route
        path="*"
        element={
          <Navigate
            replace
            to='/'
          />
        }
      />
    </Routes>
  );
};
