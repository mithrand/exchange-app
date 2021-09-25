import { combineReducers } from 'redux';
import accounts, { AccountsState } from './accounts';

export interface RootReducer {
  accountsData: AccountsState;
}

const reducers = combineReducers({
  accountsData: accounts,
});

export default reducers;
