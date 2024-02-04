import { Card } from '@mui/material';
import { SamplesTable } from './samples-table';
import { useSamplesListQuery } from '../api/queries/use-sample-list.query';
import { useBuildingListQuery } from '@/modules/Buildings/api/queries/use-bulidings-list.query';
import { useLabWorkersListQuery } from '@/modules/LabWorkers/api/queries/use-lab-workers-list.query';
import { Loading } from '@/common/loading/loading';
import { useMemo } from 'react';


export const SamplesData = () => {
  const { data: samplesList, isLoading } = useSamplesListQuery();
  const { data: buildingsList, isLoading: isBuildingLoading } = useBuildingListQuery();
  const { data: labWorkersList, isLoading: isLabWorkersLoading } = useLabWorkersListQuery();

  const handleBuilding = useMemo(() => {
    return buildingsList || []
  }, [buildingsList])

  const handleLabWorkers = useMemo(() => {
    return labWorkersList || []
  }, [labWorkersList])

  if (!buildingsList || isBuildingLoading || !labWorkersList || isLabWorkersLoading) return <Loading />

  return (
    <Card>
      <SamplesTable data={samplesList} isLoading={isLoading} buildingsList={handleBuilding} labWorkers={handleLabWorkers} />
    </Card>
  );
}

