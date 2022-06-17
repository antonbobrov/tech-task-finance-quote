import {
  AuthActionEnum, AuthActions, AuthState, AuthUser,
} from './types';

const lsUser = localStorage.getItem('user');
const user = lsUser ? JSON.parse(lsUser) as AuthUser : null;

const initialState: AuthState = {
  isLoading: false,
  isLogged: !!user,
  user,
  error: null,
};

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
      break;
    case AuthActionEnum.SET_IS_LOGGED:
      return {
        ...state,
        error: null,
        isLogged: action.payload.isLogged,
        user: action.payload.isLogged ? action.payload.user : null,
      };
      break;
    case AuthActionEnum.SET_ERROR:
      return { ...state, error: action.payload };
      break;
    default:
      return state;
      break;
  }
};
export default authReducer;
