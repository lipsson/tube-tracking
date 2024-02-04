/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { createContext, useCallback, FC, useMemo, useReducer } from 'react';
import { jwtDecode } from 'jwt-decode';


import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  AuthContextProviderProps,
  AuthContextStateProps,
  AuthContextDispatchProps,
  HandleSuccessSignInProps,
  DecodedLoginToken,
} from './auth-context.provider.types';
import { authReducer } from './auth-context.provider.reducer';
import {
  setUser,
  removeUser,
  getUser,
} from './auth-context.provider.utils';
import { useAlert, AlertOptions } from '@/common/alert';
import { useSignInMutation } from '../api/mutations/use-sign-in.mutation';
import { LoginCredentials } from '../types/auth.types';

export const AuthContextState = createContext<AuthContextStateProps | undefined>(undefined);
export const AuthContextDispatch = createContext<AuthContextDispatchProps | undefined>(undefined);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [authState, dispatchAuthState] = useReducer(authReducer, {
    user: getUser(),

  });

  const isAuthenticated = Boolean(getUser());
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const navigate = useNavigate();


  const location = useLocation();
  const { mutate: signInMutation, ...signInMutationProps } = useSignInMutation();

  const handleAlert = useCallback(
    ({ type, title, description }: AlertOptions) => {
      showAlert({ type, title, description });
    },
    [showAlert],
  );

  const handleSignOut = useCallback(
    () => {
      removeUser();
      window.location.reload();
      navigate('/');

    },
    [navigate],
  );

  const handleSuccessSignIn = useCallback(({ user, type }: HandleSuccessSignInProps) => {
    const accessToken = user.token;
    const decodedAccessTokenData = jwtDecode<DecodedLoginToken>(accessToken);
    const decodedUserData = {
      _id: decodedAccessTokenData.user._id,
      name: decodedAccessTokenData.user.name,
      email: decodedAccessTokenData.user.email,
      isAdmin: decodedAccessTokenData.user.isAdmin,
      avatar: decodedAccessTokenData.user.avatar,
      updatedAt: new Date().toUTCString(),
    };

    setUser(decodedUserData);

    dispatchAuthState({
      type,
      payload: {
        user: decodedUserData,
      },
    });
  }, []);

  const handleSignIn = useCallback(
    (data: LoginCredentials) => {
      signInMutation(data, {
        onSuccess: (response) => {
          handleSuccessSignIn({ type: 'SIGN_IN', user: response });
          handleAlert({ type: 'info', title: t('apiResponse.login') });

          if (location.state?.path) {
            navigate(location.state.path as Location);
          }
        },
        onError: (error) => {
          if (
            axios.isAxiosError(error) &&
            error?.response?.status === 400 &&
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (error?.response?.data as any)?.message === 'Account is not fully set up'
          ) {
            navigate('/check-email');
          } else {
            handleAlert({ type: 'error', title: t('apiResponse.error.login') });
          }
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [signInMutation, handleSuccessSignIn, handleAlert, t, navigate],
  );

  const state = useMemo(
    (): AuthContextStateProps => ({
      isAuthenticated,
      user: authState.user,
      error: signInMutationProps.error,
    }),
    [isAuthenticated, authState.user, signInMutationProps.error],
  );

  const dispatchState = useMemo(
    (): AuthContextDispatchProps => ({
      singIn: handleSignIn,
      signOut: handleSignOut,
    }),
    [handleSignIn, handleSignOut],
  );

  return (
    <AuthContextState.Provider value={state}>
      <AuthContextDispatch.Provider value={dispatchState}>{children}</AuthContextDispatch.Provider>
    </AuthContextState.Provider>
  );
};
