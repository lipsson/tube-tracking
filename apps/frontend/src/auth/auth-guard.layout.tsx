import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthState } from './hooks';

const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px' }}>
    <CircularProgress size={80} />
  </Box>
);

export const AuthGuardLayout: FC = () => {
  const { isAuthenticated, isTryingToSilentSignIn, isTryingToSignIn } = useAuthState();
  const location = useLocation();
  if (isTryingToSignIn) {
    return <Loading />;
  }

  return isAuthenticated || isTryingToSilentSignIn ? (
    <Outlet />
  ) : (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <Navigate replace to="/login" state={location.state} />
  );
};
