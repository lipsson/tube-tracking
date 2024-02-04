import { SidebarContext } from '@/contexts/sidebar.context';
import { RoutesType } from '@/routes/types/routes.types';
import { Button, ListItem, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

export const SidebarMenuItem = ({ route }: { route: RoutesType }) => {
    const { closeSidebar } = useContext(SidebarContext);
    return (
        <ListItem component="div">
            <Tooltip title={route.name} arrow placement="bottom-end">
                <Button disableRipple component={NavLink}
                    onClick={closeSidebar}
                    to={route.path}
                    startIcon={route.icon}
                >{route.name}</Button>
            </Tooltip>
        </ListItem >
    )
}

