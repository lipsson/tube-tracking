import { Box } from '@mui/material';
import { LogoText, LogoTextWrapper, LogoWrapper } from '../styles/logo.styles';
import { LogoImage } from '../logo-image/logo-image';

export const Logo = () => {
  return (
    <LogoWrapper to="/">
      <LogoImage />
      <Box
        component="span"
        sx={{
          display: { xs: 'none', sm: 'inline-block' }
        }}
      >
        <LogoTextWrapper>
          <LogoText>Tube Tracker</LogoText>
        </LogoTextWrapper>
      </Box>
    </LogoWrapper>
  )
};
