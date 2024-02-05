import { Loading } from '@/common/loading/loading';
import { DashboardTable } from './components/dashboard-table/dashboard-table';
import { useTranslation } from 'react-i18next';
import { useLabWorkersListQuery } from '@/modules/LabWorkers/api/queries/use-lab-workers-list.query';
import { Avatar, Box } from '@mui/material';

export const LabWorkersPage = () => {
    const { data, isLoading } = useLabWorkersListQuery();
    const { t } = useTranslation();

    if (!data) {
        return null;
    }

    if (isLoading) {
        <Loading />
    }

    return (
        <Box data-testid='dashb-table-labWorkers'>
            <DashboardTable
                total={data?.length ?? 0}
                color="#61CB31"
                title={t('dashboard.newLabWorkers')}
                rows={data?.slice(0, 5) || []}
                linkToTable={'/lab-workers'}
                getLink={() => '/lab-workers'}
                icon={'\uf0f0'}
                columns={{
                    firstName: {
                        row: (row) => row.firstName,
                        header: () => t('input.name'),
                    },
                    surname: {
                        row: (row) => row.surname,
                        header: () => t('input.city'),
                        align: 'center',
                    },
                    avatar: {
                        header: () => t('input.avatar'),
                        row: (row) => <Avatar variant="rounded" alt={row.surname} src={row?.avatar ?? '/assets/images/avatar.png'} />
                    },
                }}
            />
        </Box>
    );
};
