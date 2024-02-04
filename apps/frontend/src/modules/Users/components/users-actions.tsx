import { FC } from 'react';
import { ActionsModalState } from '@/common/types/actions-modal-state';
import { AddUsersModal } from './modals/add-users.modal';
import { DeleteUsersModal } from './modals/delete-users.modal';

export const UsersActionModal: FC<{
  state: ActionsModalState,
  onClose: VoidFunction
}> = ({ state, onClose }) => {
  switch (state.displayedModal) {
    case 'ADD':
      return <AddUsersModal onClose={onClose} />;
    case 'DELETE':
      return <DeleteUsersModal onClose={onClose} _id={state.uid} />;
    case 'NONE':
      return null;
    default:
      throw new Error('Unknown action!');
  }
};
