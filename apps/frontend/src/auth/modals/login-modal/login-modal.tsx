import { FC, useEffect, useState } from 'react';
import { Box, Chip, Divider, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useAlert } from '@/common/alert';
import { Dialogs } from '@/common/dialogs/dialogs';
import { getIsLoggedOut, removeIsLoggedOut } from './utils/login-page.utils';
import { LoginCredentials } from '@/auth/types/auth.types';
import { useAuthDispatch } from '@/auth';


export const LoginModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useTranslation();
  const { singIn } = useAuthDispatch();
  const { showAlert } = useAlert();

  const [data, setData] = useState<{ email: string | undefined, password: string | undefined }>({
    email: undefined,
    password: undefined
  })

  useEffect(() => {
    const isLoggedOut = getIsLoggedOut();

    if (isLoggedOut) {
      showAlert({ type: 'info', title: t('login.log_out') });
      removeIsLoggedOut();
    }
  }, [showAlert, t]);



  const onSubmit = () => {
    if (data.email && data.password) {
      singIn(data as LoginCredentials)
      onClose();
    } else setData({
      email: undefined,
      password: undefined
    });
  };

  return (
    <Dialogs
      isOpen
      onClose={onClose}
      onDecline={onClose}
      title={t('sidebar.login')}
      submitLabel={t('sidebar.login')}
      declineLabel={t('actions.cancel')}
      onSubmit={onSubmit}
    >
      <Box sx={{ mt: '24px' }}>
        <Divider>
          <Chip label={t('input.username')} size="small" />
        </Divider>
        <Box sx={{ my: 3 }}>
          <TextField
            name="email"
            required
            id="outlined-required"
            label={`${t('input.username')}`}
            onChange={(e) => setData((prevValues) => ({ ...prevValues, email: e.target.value }))}
            defaultValue=""
            fullWidth
          />
        </Box>

        <Divider>
          <Chip label={t('input.password')} variant="outlined" size="small" />
        </Divider>
        <Box sx={{ mt: 3 }}>
          <TextField
            id="outlined-password-input"
            label={`${t('input.password')}`}
            type="password"
            name="password"
            onChange={(e) => setData((prevValues) => ({ ...prevValues, password: e.target.value }))}
            autoComplete=""
            fullWidth
          />
        </Box>

      </Box>


    </Dialogs>

  );
};

