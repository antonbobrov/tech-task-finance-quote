import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppDispatch, AppState } from '..';
import {
  AuthActionEnum, AuthActionSetError, AuthActionSetIsLoading, AuthActionSetIsLogged,
} from './types';

function setIsLoading(payload: boolean): AuthActionSetIsLoading {
  return {
    type: AuthActionEnum.SET_IS_LOADING,
    payload,
  };
}

function setError(payload: string | null): AuthActionSetError {
  return {
    type: AuthActionEnum.SET_ERROR,
    payload,
  };
}

function toggleError(payload: string | null) {
  return (dispatch: AppDispatch) => {
    dispatch(setError(payload));
    if (payload) {
      setTimeout(() => {
        dispatch(setError(null));
      });
    }
  };
}

function setIsLogged(payload: AuthActionSetIsLogged['payload']): AuthActionSetIsLogged {
  return {
    type: AuthActionEnum.SET_IS_LOGGED,
    payload,
  };
}

function logOut() {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLogged({
      isLogged: false,
      user: null,
    }));
    localStorage.removeItem('user');
  };
}

function logIn(email: string, password: string) {
  return async (dispatch: ThunkDispatch<AppState, undefined, Action>) => {
    try {
      dispatch(setIsLoading(true));
      const response = await (await fetch('/api/auth.json', {
        method: 'GET',
      })).json();
      dispatch(setIsLoading(false));

      // eslint-disable-next-line no-console
      console.log(email, password);

      if (response.result === 'success' && response.accessToken) {
        dispatch(setIsLogged({
          isLogged: true,
          user: {
            email,
            token: 'mytoken',
          },
        }));
        localStorage.setItem('user', JSON.stringify({
          email,
          token: response.accessToken,
        }));
        return;
      }

      await logOut();

      if (response.error) {
        if (response.error.message) {
          dispatch(toggleError(response.error.message));
        }
        return;
      }

      dispatch(toggleError('Unknown error'));
    } catch (e: any) {
      dispatch(setIsLoading(false));
      dispatch(toggleError('Something went wrong'));
    }
  };
}

const authActions = {
  logIn,
  logOut,
};
export default authActions;
