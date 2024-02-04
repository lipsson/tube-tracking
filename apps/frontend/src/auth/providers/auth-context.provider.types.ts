import { LoginCredentials } from '@/auth/types/auth.types';
import { LoginUser } from '../api/dto/auth.dto';
import { ChildrenElementType } from '@/common/types/children-element.types';
import { Role } from '@/providers/roles.enum';
import { UsersType } from '@/modules/Users/types/users.types';


export interface RealmAccess {
  roles: Role[];
}

export interface Account {
  roles: string[];
}

export interface ResourceAccess {
  account: Account;
}

export type UserData = UsersType;

export interface DecodedLoginToken {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  realm_access: RealmAccess;
  resource_access: ResourceAccess;
  scope: string;
  sid: string;
  user: UserData;
  email_verified: boolean;
  preferred_username: string;
  email: string;
}

export type TokenData = {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
  refreshExpiresIn?: number;
};

export type AuthContextStateProps = {
  isAuthenticated: boolean;
  user: UsersType | null;
  error: Error | null;
};


export type AuthContextDispatchProps = {
  signOut: () => void;
  singIn: (data: LoginCredentials) => void;
};

export type AuthContextProviderProps = ChildrenElementType;

export type SignInActionsType = 'SIGN_IN' | 'SILENT_SIGN_IN';

export type HandleSuccessSignInProps = {
  user: LoginUser;
  type: SignInActionsType;
};
