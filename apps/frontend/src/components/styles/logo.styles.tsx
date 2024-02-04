import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const LogoWrapper = styled(Link)(
  ({ theme }) => `
          color: ${theme.palette.text.primary};
          padding: ${theme.spacing(0, 1, 0, 0)};
          display: flex;
          text-decoration: none;
          font-weight: ${theme.typography.fontWeightBold};
  `
);

export const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
          padding-left: ${theme.spacing(1)};
  `
);

export const LogoText = styled(Box)(
  ({ theme }) => `
          font-size: ${theme.typography.pxToRem(15)};
          font-weight: ${theme.typography.fontWeightBold};
          color: ${theme.palette.common.white};
  `
);

export const LogoImageStyle = styled('img')(
  () => `
    filter: invert(1);
  `
)
