import { UsersType } from '@/modules/Users/types/users.types';
import { SignInActionsType } from './auth-context.provider.types';

type AuthState = {
  user: UsersType | null;
};

type SignInActionPayload = { user: UsersType };

type AuthActions =
  | { type: SignInActionsType; payload: SignInActionPayload }
  | { type: 'SIGN_OUT' }

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
      };
    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
