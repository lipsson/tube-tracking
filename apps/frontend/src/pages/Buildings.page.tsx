import { ChipStatuses } from '@/common/chip-statuses/chip-statuses';
import { Loading } from '@/common/loading/loading';
import { useBuildingListQuery } from '@/modules/Buildings/api/queries/use-bulidings-list.query';

import { useTranslation } from 'react-i18next';
import { DashboardTable } from './components/dashboard-table/dashboard-table';

export const BuildingsPage = () => {
    const { data, isLoading } = useBuildingListQuery();
    const { t } = useTranslation();

    if (!data) {
        return null;
    }

    if (isLoading) {
        <Loading />
    }

    return (
        <DashboardTable
            total={data?.length ?? 0}
            color="#CE5959"
            title={t('dashboard.newBuilding')}
            rows={data?.slice(0, 5) || []}
            linkToTable={'/buildings'}
            getLink={() => '/buildings'}
            icon={'\uf0f8'}
            columns={{
                name: {
                    row: (row) => row.name,
                    header: () => t('input.name'),
                },
                city: {
                    row: (row) => row.city,
                    header: () => t('input.city'),
                    align: 'center',
                },
                isInUse: {
                    header: () => t('input.isInUse'),
                    row: (row) => ChipStatuses({
                        value: row.isInUse,
                        textSuccess: t('input.active'),
                        textDecline: t('input.inactive'),
                    }),
                },
            }}
        />
    );
};
