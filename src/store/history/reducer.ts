import { HistoryActionEnum, HistoryActions, HistoryState } from './types';

const initialState: HistoryState = {
  items: [],
  isLoading: false,
};

const historyReducer = (state = initialState, action: HistoryActions): HistoryState => {
  switch (action.type) {
    case HistoryActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case HistoryActionEnum.SET:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};
export default historyReducer;
