import { ChipStatuses } from '@/common/chip-statuses/chip-statuses';
import { Loading } from '@/common/loading/loading';
import { DashboardTable } from './components/dashboard-table/dashboard-table';
import { useUsersListQuery } from '@/modules/Users/api/queries/use-get-users-query';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

export const UsersPage = () => {
    const { data, isLoading } = useUsersListQuery();
    const { t } = useTranslation();

    if (!data) {
        return null;
    }

    if (isLoading) {
        <Loading />
    }

    return (
        <Box data-testid='dashb-table-users'>
            <DashboardTable
                total={data?.length ?? 0}
                color="#FFAB76"
                title={t('sidebar.users')}
                rows={data?.slice(0, 5) || []}
                linkToTable={'/users'}
                getLink={() => '/users'}
                icon={'\uf500'}
                columns={{
                    name: {
                        row: (row) => row.name,
                        header: () => t('input.name'),
                    },
                    email: {
                        row: (row) => row.email,
                        header: () => t('input.email'),
                        align: 'center',
                    },
                    isAdmin: {
                        header: () => t('input.isAdmin'),
                        row: (row) => ChipStatuses({
                            value: row.isAdmin,
                            textSuccess: t('actions.yes'),
                            textDecline: t('actions.no'),
                        }),
                    },
                }}
            />
        </Box>
    );
};
