import { FC } from 'react';
import { ActionsModalState } from '@/common/types/actions-modal-state';
import { EditLabWorkersModal } from './modals/edit-lab-workers.modal';
import { DeleteLabWorkersModal } from './modals/delete-lab-workers.modal';

export const LabWorkersActionModal: FC<{
  state: ActionsModalState,
  onClose: VoidFunction
}> = ({ state, onClose }) => {
  switch (state.displayedModal) {
    case 'EDIT':
      return <EditLabWorkersModal onClose={onClose} _id={state.uid} />;
    case 'DELETE':
      return <DeleteLabWorkersModal onClose={onClose} _id={state.uid} />;
    case 'NONE':
      return null;
    default:
      throw new Error('Unknown action!');
  }
};
