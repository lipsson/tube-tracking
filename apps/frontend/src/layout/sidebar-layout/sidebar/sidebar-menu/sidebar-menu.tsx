import {
  List,
} from '@mui/material';
import { MenuWrapper, SubMenuWrapper } from '@/layout/styles/menu.styles';
import { routes } from '@/routes/routes';
import { useTranslation } from 'react-i18next';
import { SidebarMenuItem } from './sidebar-menu-item';
import { useAuthState } from '@/auth';
import { Role } from '@/providers/roles.enum';

export const SidebarMenu = () => {
  const { user } = useAuthState();
  const { t } = useTranslation();


  const handleUser = (role: Role[]) => {
    if (user !== null) {
      return user?.isAdmin ? role.some((r) => r === 'admin') : role.some((r) => r === 'user');
    } else return role.some(r => r === '')
  }
  return (
    <>
      <MenuWrapper>
        {routes(t)
          .filter((show) => show.showInMenu)
          .filter((r) => r.accessRoles ? handleUser(r.accessRoles) : false)
          .map(route => (
            <List key={route.name} component="div">
              <SubMenuWrapper>
                <List component="div">
                  <SidebarMenuItem route={route} />
                </List>
              </SubMenuWrapper>
            </List>
          ))}
      </MenuWrapper>
    </>
  );
};
