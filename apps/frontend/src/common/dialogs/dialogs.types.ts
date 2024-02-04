import { DialogProps as MuiDialogProps } from '@mui/material/Dialog/Dialog';
import { ReactNode } from 'react';

type DialogsBase = {
  isOpen: boolean;
  submitLabel: string;
  declineLabel?: string;
  onClose: () => void;
  children?: React.ReactNode;
  onDecline?: () => void;
  title?: string;
  subTitle?: string;
  isSubmitButtonDisabled?: boolean;
  isSubmitting?: boolean;
  maxWidth?: MuiDialogProps['maxWidth'];
  className?: string;
  dataTestId?: string;
};

const formIdProps = 'formId';

type DialogsWithForm = DialogsBase & {
  [formIdProps]: string;
};

type DialogsWithoutForm = DialogsBase & {
  onSubmit: () => void;
};

export type DialogTitleProps = {
  uid: string;
  children?: ReactNode;
  onClose: () => void;
};

export type DialogsProps = DialogsWithForm | DialogsWithoutForm;

export const isDialogsWithForm = (props: DialogsProps): props is DialogsWithForm => formIdProps in props;
