import { Typography } from '@mui/material';

import { Dialogs } from '@/common/dialogs/dialogs';
import { useTranslation } from 'react-i18next';


import { FC } from 'react';
import { useAlert } from '@/common/alert';
import { queryClient } from '@/common/query-client';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from '../../api/mutations/use-delete-users.mutation';



export const DeleteUsersModal: FC<{ onClose: () => void, _id: string }> = ({ onClose, _id }) => {
  const { t } = useTranslation();

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const deleteUsersMutation = useDeleteUserMutation()

  const onSubmit = () => {
    deleteUsersMutation.mutate(
      { _id },
      {
        onSuccess: async () => {
          showAlert({ type: 'success', title: t('apiResponse.deleteSucces') });
          await queryClient.refetchQueries(['users']);
          navigate(`/users`);
          onClose();
        },
        onError: () =>
          showAlert({ type: 'error', title: t('apiResponse.error.deleteData') }),
      },
    );
  };

  return (
    <Dialogs
      isOpen
      onClose={onClose}
      onDecline={onClose}
      title={t('actions.delete')}
      submitLabel={t('actions.delete')}
      declineLabel={t('actions.cancel')}
      onSubmit={onSubmit}
      isSubmitting={deleteUsersMutation.isLoading}
    >
      <Typography textAlign="center">{`${t('actions.delete')} ${t('input.user')} ${_id}?`}</Typography>
    </Dialogs>
  );
};
