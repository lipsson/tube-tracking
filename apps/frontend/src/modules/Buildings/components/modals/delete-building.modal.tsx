import { Typography } from '@mui/material';

import { Dialogs } from '@/common/dialogs/dialogs';
import { useTranslation } from 'react-i18next';

import { useDeleteBuildingMutation } from '../../api/mutations/use-delete-building.mutation';
import { FC } from 'react';
import { useAlert } from '@/common/alert';
import { queryClient } from '@/common/query-client';
import { useNavigate } from 'react-router-dom';


export const DeleteBulidingModal: FC<{ onClose: () => void, _id: string }> = ({ onClose, _id }) => {
  const { t } = useTranslation();

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const deleteBuilldingMutation = useDeleteBuildingMutation()

  const onSubmit = () => {
    deleteBuilldingMutation.mutate(
      { _id },
      {
        onSuccess: async () => {
          showAlert({ type: 'success', title: t('apiResponse.deleteSucces') });
          await queryClient.refetchQueries(['building']);
          navigate(`/buildings`);
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
      isSubmitting={deleteBuilldingMutation.isLoading}
      dataTestId='delete-buliding'
    >
      <Typography textAlign="center">{`${t('actions.delete')} ${t('input.building')} ${_id}?`}</Typography>
    </Dialogs>
  );
};
