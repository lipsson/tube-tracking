import { Role } from '@/providers/roles.enum';
import type { SvgIconComponent } from '@mui/icons-material';
import type { ReactElement } from 'react';
import type { RouteObject } from 'react-router';

export type RoutesType = RouteObject & {
  icon?: ReactElement<SvgIconComponent>;
  name?: string;
  path: string;
  showInMenu: boolean;
  accessRoles?: Role[];
};
