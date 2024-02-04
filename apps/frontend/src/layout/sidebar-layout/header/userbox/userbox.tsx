import { FC, useRef, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Hidden,
  Popover,
} from '@mui/material';

import { ExpandMoreTwoTone, LockOpenTwoTone } from '@mui/icons-material';

import { UsersType } from '@/modules/Users/types/users.types';
import { UserBoxButton, UserBoxText, UserBoxLabel, UserBoxDescription, MenuUserBox } from '@/layout/styles/userbox.styles';
import { useTranslation } from 'react-i18next';
import { useAuthDispatch } from '@/auth';

export const Userbox: FC<{ user: UsersType }> = ({ user }) => {
  const { t } = useTranslation();
  const { signOut } = useAuthDispatch();

  const ref = useRef<any>(null);

  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    signOut()
  }

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={user.name} src={user.avatar ?? '/assets/images/avatar.png'} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.email}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoTone sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.email}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={logout}>
            <LockOpenTwoTone sx={{ mr: 1 }} />
            {t('sidebar.logOut')}
          </Button>
        </Box>
      </Popover>

    </>


  );
};
