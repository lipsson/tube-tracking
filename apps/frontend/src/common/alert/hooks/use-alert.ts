import { useContext } from 'react';
import { AlertContext } from '../providers/alert-context.provider';

export const useAlert = () => {
  const ctx = useContext(AlertContext);

  if (!ctx) {
    throw new Error('Component beyond AlertContext!');
  }

  return ctx;
};
