import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '..';
import { HistoryActionEnum, HistoryActionSet, HistoryActionSetIsLoading } from './types';

function setIsLoading(payload: boolean): HistoryActionSetIsLoading {
  return {
    type: HistoryActionEnum.SET_IS_LOADING,
    payload,
  };
}

function set(payload: HistoryActionSet['payload']): HistoryActionSet {
  return {
    type: HistoryActionEnum.SET,
    payload,
  };
}

function fetchHistroy() {
  return async (dispatch: ThunkDispatch<AppState, undefined, Action>) => {
    try {
      dispatch(setIsLoading(true));
      const response = await (await fetch('/api/history.json')).json();
      dispatch(setIsLoading(false));
      if (response.items) {
        dispatch(set(response.items));
      }
    } catch (e: any) {
      dispatch(setIsLoading(false));
    }
  };
}

const historyActions = {
  fetchHistroy,
};
export default historyActions;
