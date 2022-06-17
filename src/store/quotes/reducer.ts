import {
  QuotesActionEnum, QuotesActions, QuotesStarredItem, QuotesState,
} from './types';

let starred: QuotesStarredItem[] = [];
try {
  starred = JSON.parse(localStorage.getItem('starredQuotes') as any) || [];
} catch (e) {
  //
}

const initialState: QuotesState = {
  items: [],
  starred,
  isLoading: false,
};

const quotesReducer = (state = initialState, action: QuotesActions): QuotesState => {
  switch (action.type) {
    case QuotesActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case QuotesActionEnum.SET:
      return { ...state, items: action.payload };
    case QuotesActionEnum.STAR:
      return { ...state, starred: [...state.starred, action.payload] };
    case QuotesActionEnum.UNSTAR:
      return {
        ...state,
        starred: state.starred.filter((obj) => obj.key !== action.payload.key),
      };
    default:
      return state;
  }
};
export default quotesReducer;
