import { Box, alpha, styled } from "@mui/material";

export const HeaderWrapper = styled(Box)(
    ({ theme }) => `
          height: ${theme.header.height};
          color: ${theme.header.textColor};
          
          padding: ${theme.spacing(0, 2)};
          right: 0;
          z-index: 6;
          background-color: ${alpha(theme?.header?.background as string, 0.95)};
          backdrop-filter: blur(3px);
          position: fixed;
          justify-content: space-between;
          width: 100%;
          @media (min-width: ${theme.breakpoints.values.lg}px) {
              left: ${theme.sidebar.width};
              width: auto;
          }
  `
);