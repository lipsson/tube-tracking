import { Card } from '@mui/material';
import { LabWorkersTable } from './lab-workers-table';
import { useLabWorkersListQuery } from '../api/queries/use-lab-workers-list.query';
import { useBuildingListQuery } from "@/modules/Buildings/api/queries/use-bulidings-list.query";
import { Loading } from '@/common/loading/loading';
import { useMemo } from 'react';

export const LabWorkersData = () => {
  const { data: labWorkersList, isLoading } = useLabWorkersListQuery();
  const { data: buildingsList, isLoading: isBuildingLoading } = useBuildingListQuery();

  const handleBuilding = useMemo(() => {
    return buildingsList || []
  }, [buildingsList])

  if (!buildingsList || isBuildingLoading) return <Loading />

  return (
    <Card>
      <LabWorkersTable data={labWorkersList} buildingsList={handleBuilding} isLoading={isLoading} />
    </Card>
  );
}

