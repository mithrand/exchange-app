import { combineReducers } from 'redux';
import accounts, { AccountsState } from './accounts';
import exchange, { ExchangeState } from './exchange';

export interface RootReducer {
  accountsData: AccountsState;
  exchange: ExchangeState;
}

const reducers = combineReducers({
  accountsData: accounts,
  exchange,
});

export default reducers;
