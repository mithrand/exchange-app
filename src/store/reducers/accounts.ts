import { v4 as uuid } from 'uuid';
import { ACTIONS_TYPES } from '../actions/accounts';
import { Account, GenericAction } from '../../types';
import currencies from '../../data/currencies';

export interface AccountsState {
  accounts: Account[];
  from: Account['id'];
  to: Account['id'];
}

const accounts = [
  {
    id: uuid(),
    currency: { ...currencies.EUR },
    balance: 1500.894,
  },
  {
    id: uuid(),
    currency: { ...currencies.GBP },
    balance: 120.57,
  },
  {
    id: uuid(),
    currency: { ...currencies.USD },
    balance: 0,
  },
];

export const initialState: AccountsState = {
  accounts,
  from: accounts[0].id,
  to: accounts[1].id,
};

const addBalanceToAccount = (
  allAccounts: Account[],
  accountId: Account['id'],
  quantity: Account['balance'],
) =>
  allAccounts.map((account) => {
    if (account.id === accountId) {
      return { ...account, balance: account.balance + quantity };
    }
    return account;
  });

const removeBalanceFromAccount = (
  allAccounts: Account[],
  accountId: Account['id'],
  quantity: Account['balance'],
) =>
  allAccounts.map((account) =>
    account.id === accountId
      ? { ...account, balance: account.balance - quantity }
      : account,
  );

const reducers = {
  [ACTIONS_TYPES.ADD_TO_BALANCE]: (
    state: AccountsState,
    payload: { accountId: Account['id']; quantity: Account['balance'] },
  ): AccountsState => ({
    ...state,
    accounts: addBalanceToAccount(
      state.accounts,
      payload.accountId,
      payload.quantity,
    ),
  }),
  [ACTIONS_TYPES.REMOVE_FROM_BALANCE]: (
    state: AccountsState,
    payload: { accountId: Account['id']; quantity: Account['balance'] },
  ): AccountsState => ({
    ...state,
    accounts: removeBalanceFromAccount(
      state.accounts,
      payload.accountId,
      payload.quantity,
    ),
  }),
  [ACTIONS_TYPES.SET_ACCOUNT_FROM]: (
    state: AccountsState,
    { accountId }: { accountId: Account['id'] },
  ): AccountsState => ({
    ...state,
    from:
      state.accounts.find((account) => account.id === accountId)?.id ||
      state.from,
  }),
  [ACTIONS_TYPES.SET_ACCOUNT_TO]: (
    state: AccountsState,
    { accountId }: { accountId: Account['id'] },
  ): AccountsState => ({
    ...state,
    to: state.accounts.find((account) => account.id === accountId)?.id || state.to,
  }),
  default: (state: AccountsState) => state,
};

const accountsReducer = (
  state: AccountsState = initialState,
  action: GenericAction,
): AccountsState => {
  const reducer = reducers[action.type] || reducers.default;
  return reducer(state, action.payload);
};

export default accountsReducer;
