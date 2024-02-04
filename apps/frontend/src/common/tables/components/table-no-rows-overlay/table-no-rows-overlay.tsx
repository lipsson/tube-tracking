import { FC } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

type TableNoRowsOverlayProps = {
  text: string;
};

export const TableNoRowsOverlay: FC<TableNoRowsOverlayProps> = ({ text }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: '100px' }}
    >
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};
