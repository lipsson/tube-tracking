import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import { useEditBuildingMutation } from '../../api/mutations/use-edit-building.mutation';
import { AddOrEditBuildingType } from '../../types/buildings.types';
import { useAlert } from '@/common/alert';
import { Dialogs } from '@/common/dialogs/dialogs';

export const EditBuildingModal: FC<{ onClose: () => void, _id: string }> = ({ onClose, _id }) => {
  const { t } = useTranslation();

  const { showAlert } = useAlert();
  const client = useQueryClient();
  const editBuilldingMutation = useEditBuildingMutation()

  const onSubmit = (data: AddOrEditBuildingType) => {
    editBuilldingMutation.mutate(
      { _id, updatedAt: new Date().toUTCString(), ...data },
      {
        onSuccess: async () => {
          showAlert({ type: 'success', title: t('apiResponse.success') });
          await client.invalidateQueries(['building']);

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
      isSubmitting={editBuilldingMutation.isLoading}
      onSubmit={() => onSubmit}
      maxWidth="xl"
      dataTestId='edit-buliding'

    >
      <Typography textAlign="center">test</Typography>
    </Dialogs>

  );
};
