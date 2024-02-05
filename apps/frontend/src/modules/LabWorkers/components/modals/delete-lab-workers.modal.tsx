import { Typography } from '@mui/material';

import { Dialogs } from '@/common/dialogs/dialogs';
import { useTranslation } from 'react-i18next';

import { useDeleteLabWorkersMutation } from '../../api/mutations/use-delete-lab-workers.mutation';
import { FC } from 'react';
import { useAlert } from '@/common/alert';
import { queryClient } from '@/common/query-client';
import { useNavigate } from 'react-router-dom';


export const DeleteLabWorkersModal: FC<{ onClose: () => void, _id: string }> = ({ onClose, _id }) => {
  const { t } = useTranslation();

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const deleteLabWorkerMutation = useDeleteLabWorkersMutation()

  const onSubmit = () => {
    deleteLabWorkerMutation.mutate(
      { _id },
      {
        onSuccess: async () => {
          showAlert({ type: 'success', title: t('apiResponse.deleteSucces') });
          await queryClient.refetchQueries(['lab-workers']);
          navigate(`/lab-workers`);
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
      isSubmitting={deleteLabWorkerMutation.isLoading}
      dataTestId='delete-labWorkers'
    >
      <Typography textAlign="center">{`${t('actions.delete')} ${t('input.lab-worker')} ${_id}?`}</Typography>
    </Dialogs>
  );
};
