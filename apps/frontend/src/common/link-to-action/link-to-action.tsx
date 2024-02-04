import { SvgIconComponent } from '@mui/icons-material';
import { Link } from '@mui/material';
import { ReactElement } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

type LinkToActionProps = {
  linkTo: string;
  color?: string;
  icon?: ReactElement<SvgIconComponent>;
  dataTestId: string;
  disabled?: boolean;
  search?: string;
};

export const LinkToAction = (props: LinkToActionProps) => {
  const { linkTo, color = 'primary.main', icon, dataTestId, disabled = false, search } = props;

  return (
    <Link
      component={ReactRouterLink}
      data-testid={dataTestId}
      sx={{
        color: disabled ? 'lightgray' : color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: disabled ? 'none' : '',
      }}
      to={linkTo}
      state={{ search }}
    >
      {icon || <VisibilityIcon fontSize="small" />}
    </Link>
  );
};
