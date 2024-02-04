import { useContext } from 'react';
import { AuthContextDispatch, AuthContextState } from '../providers';

export const useAuthState = () => {
  const ctx = useContext(AuthContextState);

  if (!ctx) {
    throw new Error('useAuthState must be used within AuthContextProvider');
  }

  return ctx;
};

export const useAuthDispatch = () => {
  const ctx = useContext(AuthContextDispatch);

  if (!ctx) {
    throw new Error('useAuthDispatch must be used within AuthContextProvider');
  }

  return ctx;
};
