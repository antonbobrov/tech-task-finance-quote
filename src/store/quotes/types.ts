export interface QuotesItem {
  key: string;
  from: string;
  to: string;
  quote: number;
}

export interface QuotesStarredItem {
  key: string;
}

export interface QuotesState {
  items: QuotesItem[];
  starred: QuotesStarredItem[];
  isLoading: boolean;
}

export enum QuotesActionEnum {
  SET_IS_LOADING = 'QUOTES_SET_IS_LOADING',
  SET = 'QUOTES_SET',
  STAR = 'QUOTES_STAR',
  UNSTAR = 'QUOTES_UNSTAR',
}

export interface QuotesActionSetIsLoading {
  type: QuotesActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export interface QuotesActionSet {
  type: QuotesActionEnum.SET;
  payload: QuotesItem[];
}

export interface QuotesActionStar {
  type: QuotesActionEnum.STAR;
  payload: QuotesStarredItem;
}

export interface QuotesActionUnstar {
  type: QuotesActionEnum.UNSTAR;
  payload: QuotesStarredItem;
}

export type QuotesActions = QuotesActionSetIsLoading
| QuotesActionSet | QuotesActionStar | QuotesActionUnstar;
