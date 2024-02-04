import { FC } from 'react';
import { ActionsModalState } from '@/common/types/actions-modal-state';
import { EditSampleModal } from './modals/edit-samples.modal';
import { DeleteSampleModal } from './modals/delete-samples.modal';

export const SamplesActionModal: FC<{
  state: ActionsModalState,
  onClose: VoidFunction
}> = ({ state, onClose }) => {
  switch (state.displayedModal) {
    case 'EDIT':
      return <EditSampleModal onClose={onClose} _id={state.uid} />;
    case 'DELETE':
      return <DeleteSampleModal onClose={onClose} _id={state.uid} />;
    case 'NONE':
      return null;
    default:
      throw new Error('Unknown action!');
  }
};
