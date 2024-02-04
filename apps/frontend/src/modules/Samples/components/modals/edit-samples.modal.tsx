import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import { useAlert } from '@/common/alert';
import { Dialogs } from '@/common/dialogs/dialogs';
import { AddOrEditSamplesType } from '../../types/samples.types';
import { useEditSamplesMutation } from '../../api/mutations/use-edit-samples.mutation';

export const EditSampleModal: FC<{ onClose: () => void, _id: string }> = ({ onClose, _id }) => {
  const { t } = useTranslation();

  const { showAlert } = useAlert();
  const client = useQueryClient();
  const editSamplesMutation = useEditSamplesMutation()

  const onSubmit = (data: AddOrEditSamplesType) => {
    editSamplesMutation.mutate(
      { _id, ...data, updatedAt: new Date().toUTCString() },
      {
        onSuccess: async () => {
          showAlert({ type: 'success', title: t('apiResponse.success') });
          await client.invalidateQueries(['samples']);

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
      formId="samples-edit-form"
      isSubmitting={editSamplesMutation.isLoading}
      onSubmit={() => onSubmit}
      maxWidth="xl"
    >
      <Typography textAlign="center">{`Id: ${_id}`}</Typography>
    </Dialogs>

  );
};
