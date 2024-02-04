import { FC } from 'react';
import { Box } from '@mui/material';
import { SidebarLayout } from './sidebar-layout/sidebar.layout';


export const Layout: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarLayout />
    </Box>
  );
};
