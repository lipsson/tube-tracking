import { ChipStatuses } from '@/common/chip-statuses/chip-statuses';
import { Loading } from '@/common/loading/loading';
import { useSamplesListQuery } from '@/modules/Samples/api/queries/use-sample-list.query';
import { DashboardTable } from './components/dashboard-table/dashboard-table';
import { StatusArray } from '@/modules/Samples/utils/status-array';
import { useTranslation } from 'react-i18next';

export const SamplesPage = () => {
    const { data, isLoading } = useSamplesListQuery();
    const { t } = useTranslation();

    if (!data || isLoading) {
        <Loading />
    }

    return (
        <DashboardTable
            total={data?.length ?? 0}
            color="#5568FF"
            title={t('dashboard.newSamples')}
            rows={data?.slice(0, 5) || []}
            linkToTable={'/samples'}
            getLink={() => '/samples'}
            icon={'\uf493'}
            columns={{
                name: {
                    row: (row) => row.name,
                    header: () => t('input.name'),
                },
                patientId: {
                    row: (row) => row.patientId,
                    header: () => t('input.patientId'),
                    align: 'center',
                },
                status: {
                    header: () => t('input.status'),
                    row: (row) => ChipStatuses({
                        value: StatusArray[row.status] || 'draft',
                        textSuccess: `${t(`status.${StatusArray[row.status] || 'draft'}`)}`,
                    }),
                },
            }}
        />
    );
};
