import { useContext } from 'react';

import {
  Box,
  Drawer,
  Divider,
  useTheme,
  darken,
} from '@mui/material';

import { Logo } from '@/components/logo/logo';
import { Scrollbar } from '@/components/scrollbar/scrollbar';
import { SidebarContext } from '@/contexts/sidebar.context';
import { SidebarWrapper } from '@/layout/styles/sidebar.styles';
import { SidebarMenu } from './sidebar-menu/sidebar-menu';

export const Sidebar = () => {

  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? theme.colors.alpha.white[100]
              : darken(theme.colors.alpha.black[100], 0.5),
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
      >
        <Scrollbar>
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52
              }}
            >
              <Logo />
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10]
            }}
          />
          <SidebarMenu />
        </Scrollbar>
      </SidebarWrapper >
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5)
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10]
              }}
            />
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
};
