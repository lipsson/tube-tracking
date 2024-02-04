import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { Typography } from '@mui/material';

import { useAlert } from '@/common/alert';
import { Dialogs } from '@/common/dialogs/dialogs';
import { useEditLabWorkersMutation } from '../../api/mutations/use-edit-lab-workers.mutation';
import { AddOrEditLabWorkersType } from '../../types/lab-workers.types';

export const EditLabWorkersModal: FC<{ onClose: () => void, _id: string }> = ({ onClose, _id }) => {
  const { t } = useTranslation();

  const { showAlert } = useAlert();
  const client = useQueryClient();
  const editLabWorkerMutation = useEditLabWorkersMutation()

  const onSubmit = (data: AddOrEditLabWorkersType) => {
    editLabWorkerMutation.mutate(
      { _id, ...data },
      {
        onSuccess: async () => {
          showAlert({ type: 'success', title: t('apiResponse.success') });
          await client.invalidateQueries(['lab-workers']);

          onClose();
        },
        onError: () =>
          showAlert({ type: 'error', title: t('apiResponse.error.saveModifyData') }),
      },
    );
  };

  return (
    <Dialogs
      isOpen
      title={t('actions.edit')}
      submitLabel={t('actions.save')}
      declineLabel={t('actions.cancel')}
      onClose={onClose}
      onDecline={onClose}
      formId="building-edit-form"
      isSubmitting={editLabWorkerMutation.isLoading}
      onSubmit={() => onSubmit}
      maxWidth="xl"
    >
      <Typography textAlign="center">test</Typography>
    </Dialogs>

  );
};
