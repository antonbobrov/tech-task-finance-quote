import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import authActions from './auth/actions';
import quotesActions from './quotes/actions';
import historyActions from './history/actions';

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...authActions,
    ...quotesActions,
    ...historyActions,
  }, dispatch);
};
export default useActions;
