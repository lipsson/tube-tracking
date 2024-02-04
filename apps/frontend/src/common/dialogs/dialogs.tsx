import { DialogsProps, isDialogsWithForm } from '@/common/dialogs/dialogs.types';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

export const Dialogs = (props: DialogsProps) => {
  const handleClose = () => {
    if (props.isSubmitting) return;
    props.onClose();
  };

  const isSubmitButtonDisabled = props.isSubmitButtonDisabled || props.isSubmitting;

  const testId = props.dataTestId || '';

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={props.maxWidth || 'md'}
      className={props.className}
      data-testid={`modal-${testId}`}
    >
      <Box
        sx={{
          px: 4,
          my: 2,
        }}
      >
        <Box>
          <DialogTitle
            id="alert-dialog-title"
            variant="h4"
            align="center"
            sx={{
              p: 0,
              pb: props.subTitle ? 2 : 0,
            }}
            data-testid={`modal-${testId}-title`}
          >
            {props.title}
            <IconButton
              aria-label="close"
              onClick={props.onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              disabled={props.isSubmitting}
            >
              <CloseIcon data-testid={`modal-${testId}-close-icon`} />
            </IconButton>
          </DialogTitle>
          {props.subTitle && (
            <DialogTitle
              id="alert-dialog-sub-title"
              align="center"
              variant="body2"
              sx={{ p: 0, pb: !props.children ? 2 : 0 }}
              data-testid={`modal-${testId}-subtitle`}
            >
              {props.subTitle}
            </DialogTitle>
          )}
        </Box>
        {props.children && <DialogContent sx={{ py: 4, px: 2, overflowY: 'unset' }}>{props.children}</DialogContent>}
        <DialogActions sx={{ px: 2, justifyContent: 'center' }}>
          {props.declineLabel && (
            <Button
              onClick={props.onDecline || props.onClose}
              disabled={props.isSubmitting}
              sx={{ mr: 2 }}
              data-testid={`modal-${testId}-decline-button`}
            >
              {props.declineLabel}
            </Button>
          )}
          {isDialogsWithForm(props) ? (
            <LoadingButton
              type="submit"
              variant="contained"
              form={props.formId}
              disabled={isSubmitButtonDisabled}
              loading={props.isSubmitting}
              data-testid={`modal-${testId}-submit-button`}
            >
              {props.submitLabel}
            </LoadingButton>
          ) : (
            <LoadingButton
              type="button"
              variant="contained"
              onClick={props.onSubmit}
              disabled={isSubmitButtonDisabled}
              loading={props.isSubmitting}
              data-testid={`modal-${testId}-submit-button`}
            >
              {props.submitLabel}
            </LoadingButton>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};
