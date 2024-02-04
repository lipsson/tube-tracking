import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

export const LayoutContainerStyles = styled(Container)(() => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: 'calc(100vh - 50px)',
  padding: 25,
  maxWidth: 1920,
}));
