import { Grid, styled } from "@mui/material";

export const GridHeaderStyle = styled(Grid)(({ theme }) => ({
    color: theme.palette.primary.main,
    width: 'auto',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.grey[300],
    fontSize: 24,
    fontWeight: 700,
    padding: '16px 32px',
    marginBottom: 0,
    flexDirection: 'row',
    maxHeight: 55,
}));
