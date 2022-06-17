import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import quotesReducer from './quotes/reducer';
import historyReducer from './history/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  quotes: quotesReducer,
  history: historyReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;

store.subscribe(() => {
  localStorage.setItem('starredQuotes', JSON.stringify(store.getState().quotes.starred));
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
