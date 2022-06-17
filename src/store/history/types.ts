export interface HistoryItem {
  key: string;
  from: string;
  to: string;
  quote: number;
  date: number;
  profit: string;
}

export interface HistoryState {
  items: HistoryItem[];
  isLoading: boolean;
}

export enum HistoryActionEnum {
  SET_IS_LOADING = 'HISTORY_SET_IS_LOADING',
  SET = 'HISTORY_SET',
}

export interface HistoryActionSetIsLoading {
  type: HistoryActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export interface HistoryActionSet {
  type: HistoryActionEnum.SET;
  payload: HistoryItem[];
}

export type HistoryActions = HistoryActionSetIsLoading | HistoryActionSet;
