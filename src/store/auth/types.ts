export interface AuthUser {
  email: string;
  token: string;
}

export interface AuthState {
  isLoading: boolean;
  isLogged: boolean;
  user: AuthUser | null;
  error: string | null;
}

export enum AuthActionEnum {
  SET_IS_LOADING = 'AUTH_SET_IS_LOADING',
  SET_IS_LOGGED = 'AUTH_SET_IS_LOGGED',
  SET_ERROR = 'AUTH_SET_ERROR',
}

export interface AuthActionSetIsLoading {
  type: AuthActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export interface AuthActionSetIsLogged {
  type: AuthActionEnum.SET_IS_LOGGED;
  payload: {
    isLogged: boolean;
    user: AuthState['user'];
  };
}

export interface AuthActionSetError {
  type: AuthActionEnum.SET_ERROR;
  payload: null | string;
}

export type AuthActions = AuthActionSetIsLoading | AuthActionSetIsLogged | AuthActionSetError;
