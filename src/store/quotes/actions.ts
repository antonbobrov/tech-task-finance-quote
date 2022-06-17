import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '..';
import authHeaders from '../../helpers/authHeaders';
import {
  QuotesActionEnum, QuotesActionSet, QuotesActionSetIsLoading, QuotesActionStar, QuotesActionUnstar,
} from './types';

function setIsLoading(payload: boolean): QuotesActionSetIsLoading {
  return {
    type: QuotesActionEnum.SET_IS_LOADING,
    payload,
  };
}

function set(payload: QuotesActionSet['payload']): QuotesActionSet {
  return {
    type: QuotesActionEnum.SET,
    payload,
  };
}

function fetchQuotes() {
  return async (dispatch: ThunkDispatch<AppState, undefined, Action>) => {
    try {
      dispatch(setIsLoading(true));
      const response = await (await fetch('/api/quotes.json', {
        headers: {
          ...authHeaders(),
        },
      })).json();
      dispatch(setIsLoading(false));

      if (response.items) {
        dispatch(set(response.items));
      }
    } catch (e: any) {
      dispatch(setIsLoading(false));
    }
  };
}

function starQuote(payload: QuotesActionStar['payload']): QuotesActionStar {
  return {
    type: QuotesActionEnum.STAR,
    payload,
  };
}

function unStarQuote(payload: QuotesActionUnstar['payload']): QuotesActionUnstar {
  return {
    type: QuotesActionEnum.UNSTAR,
    payload,
  };
}

const quotesActions = {
  fetchQuotes,
  starQuote,
  unStarQuote,
};
export default quotesActions;
