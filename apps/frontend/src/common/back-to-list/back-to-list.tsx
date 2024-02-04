/* eslint-disable */
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BackToListProps } from '../types/back-to-list';

export const BackToList: FC<BackToListProps> = ({ to, text, sx, className }) => {
  const { t } = useTranslation();
  const location = useLocation();

  let chipTo = to;
  let label = `${t(text || 'actions.back_to_list')}`;

  if (location.state?.search) {
    chipTo = `${to}${location.state?.search}`;
  } else if (location.state?.returnHref) {
    chipTo = location.state?.returnHref;
    label = location.state?.returnText;
  }

  return (
    <Chip
      label={label}
      variant="outlined"
      icon={<ArrowBackIcon fontSize="small" />}
      sx={{ ml: -1, borderWidth: 0, fontSize: '1rem', color: '#616161', ...sx }}
      component={Link}
      to={chipTo}
      clickable
      className={className}
    />
  );
};
