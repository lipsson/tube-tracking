import { Box, styled } from "@mui/material";

export const SidebarWrapper = styled(Box)(
  ({ theme }) => `
          width: ${theme.sidebar.width};
          min-width: ${theme.sidebar.width};
          color: ${theme.colors.alpha.trueWhite[70]};
          position: relative;
          z-index: 7;
          height: 100%;
          padding-bottom: 68px;
  `
);