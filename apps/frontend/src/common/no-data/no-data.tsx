import { Alert, Box, Typography } from "@mui/material";

export const NoData = (noData: { title: string, description?: string }) => {
  const { title, description } = noData;
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h1">{title}</Typography>
      <Alert severity="error">{description}</Alert>
    </Box>
  );
}