import { FC } from 'react';
import { ActionsModalState } from '@/common/types/actions-modal-state';
import { EditBuildingModal } from './modals/edit-building.modal';
import { DeleteBulidingModal } from './modals/delete-building.modal';

export const BuildingActionModal: FC<{
  state: ActionsModalState,
  onClose: VoidFunction
}> = ({ state, onClose }) => {
  switch (state.displayedModal) {
    case 'EDIT':
      return <EditBuildingModal onClose={onClose} _id={state.uid} />;
    case 'DELETE':
      return <DeleteBulidingModal onClose={onClose} _id={state.uid} />;
    case 'NONE':
      return null;
    default:
      throw new Error('Unknown action!');
  }
};
