import { Chip } from '@mui/material';
import { stringToColor } from '../utils/string-to-color';
import { ChipStatusesType } from '../types/chip-statuses.types';
import { FC } from 'react';

export const ChipStatuses: FC<ChipStatusesType> = (props) => {
  const { fontSize = 12, fontWeight = 600, textDecline = '', type = 'success' } = props;
  const colorSuccess = type === 'success' ? 'success.main' : 'info.main';
  const colorDecline = type === 'success' ? 'error.main' : 'warning.main';

  return typeof props.value === 'boolean' ? (
    <Chip
      label={props.value ? props.textSuccess : textDecline}
      variant="outlined"
      size="small"
      sx={{
        fontSize,
        fontWeight,
        color: props.value ? colorSuccess : colorDecline,
        borderColor: props.value ? colorSuccess : colorDecline,
      }}
    />
  ) : (
    <Chip
      label={props.textSuccess}
      variant="outlined"
      size="small"
      sx={{
        fontSize,
        fontWeight,
        color: stringToColor(props.value),
        borderColor: stringToColor(props.value),
      }}
    />
  );
};
