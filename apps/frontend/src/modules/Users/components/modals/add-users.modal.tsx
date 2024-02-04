import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import { useAlert } from '@/common/alert';
import { Dialogs } from '@/common/dialogs/dialogs';
import { useAddUsersMutation } from '../../api/mutations/use-add-users.mutation';
import { AddUsersType } from '../../types/users.types';

export const AddUsersModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useTranslation();

  const { showAlert } = useAlert();
  const client = useQueryClient();
  const addUserMutation = useAddUsersMutation()

  const onSubmit = (data: AddUsersType) => {
    addUserMutation.mutate(
      data,
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
      isSubmitting={addUserMutation.isLoading}
      onSubmit={() => onSubmit}
      maxWidth="xl"
    >
      <Typography textAlign="center">test</Typography>
    </Dialogs>

  );
};
