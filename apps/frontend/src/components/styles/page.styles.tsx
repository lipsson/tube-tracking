import { Box, styled } from "@mui/material";

export const PageTitleStyle = styled(Box)(
    ({ theme }) => `
          padding: ${theme.spacing(4)};
          margin-bottom: 0;
  `
);

export const PageTitleWrapperStyle = PageTitleStyle;