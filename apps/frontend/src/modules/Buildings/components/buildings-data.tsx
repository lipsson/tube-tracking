import { Card } from '@mui/material';
import { BuildingsTable } from './buildings-table';
import { useBuildingListQuery } from '../api/queries/use-bulidings-list.query';


export const BuildingsData = () => {
  const { data: buildingsList, isLoading } = useBuildingListQuery();

  return (
    <Card>
      <BuildingsTable data={buildingsList} isLoading={isLoading} />
    </Card>
  );
}

