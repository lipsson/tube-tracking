import { Card } from '@mui/material';
import { useSampleDetailsQuery } from '../api/queries/use-sample-details.query';
import { useParams } from 'react-router-dom';
import { SampleDetalisPreview } from './sample-details-preview';
import { Loading } from '@/common/loading/loading';
import { useBuildingListQuery } from '@/modules/Buildings/api/queries/use-bulidings-list.query';
import { useLabWorkersListQuery } from '@/modules/LabWorkers/api/queries/use-lab-workers-list.query';
import { useMemo, useState } from 'react';
import { ActionsModalState } from '@/common/types/actions-modal-state';
import { SamplesActionModal } from './samples-actions';


export const SampleDetalisData = () => {
  const { uid } = useParams()
  const { data: sampleDetails, isLoading } = useSampleDetailsQuery(uid || '');
  const { data: buildingsList, isLoading: isBuildingLoading } = useBuildingListQuery();
  const { data: labWorkersList, isLoading: isLabWorkersLoading } = useLabWorkersListQuery();

  const [actionsModalState, setActionsModalState] = useState<ActionsModalState>({
    displayedModal: 'NONE',
  });

  const hideActionModal = () => {
    setActionsModalState({ displayedModal: 'NONE' });
  };

  const handleBuilding = useMemo(() => {
    return buildingsList || []
  }, [buildingsList])

  const handleLabWorkers = useMemo(() => {
    return labWorkersList || []
  }, [labWorkersList])

  if (!buildingsList || isBuildingLoading || !labWorkersList || isLabWorkersLoading) return <Loading />

  return (
    <Card>
      <SampleDetalisPreview
        data={sampleDetails}
        isLoading={isLoading}
        buildingsList={handleBuilding}
        labWorkers={handleLabWorkers}
        action={(action) => setActionsModalState({ displayedModal: action, uid: uid || '' })}
      />
      <SamplesActionModal state={actionsModalState} onClose={hideActionModal} />
    </Card>
  );
}

