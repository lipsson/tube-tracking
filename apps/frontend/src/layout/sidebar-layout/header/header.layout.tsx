import {
  Box,
  Button,
  alpha,
  lighten,
  useTheme
} from '@mui/material';

import { HeaderWrapper } from '@/layout/styles/header.styles';
import { Userbox } from './userbox/userbox';
import { Lang } from './lang/lang';
import { useAuthState } from '@/auth';
import { useTranslation } from 'react-i18next';
import { LockOpenTwoTone } from '@mui/icons-material';
import { useState } from 'react';
import { LoginModal } from '@/auth/modals/login-modal/login-modal';

export const Header = () => {
  const theme = useTheme();
  const { user } = useAuthState();
  const { t } = useTranslation();

  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false)

  const handleLogin = () => {
    setIsOpenLoginModal(true)
  }

  return (
    <>
      <HeaderWrapper
        display="flex"
        alignItems="center"
        sx={{
          boxShadow:
            theme.palette.mode === 'dark'
              ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
              : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`
        }}
      >
        <Box display="flex" alignItems="center" justifyContent='flex-end' sx={{ width: '100%' }}>
          <Lang />
          {user ? <Userbox user={user} /> : (
            <Box sx={{ m: 1 }}>
              <Button color="primary" fullWidth onClick={handleLogin}>
                <LockOpenTwoTone sx={{ mr: 1 }} />
                {t('sidebar.login')}
              </Button>
            </Box>
          )}
        </Box>
      </HeaderWrapper>
      {isOpenLoginModal && <LoginModal onClose={() => setIsOpenLoginModal(false)} />}
    </>
  );
};
