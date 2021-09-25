import { Account } from '../../types';

export const ACTIONS_TYPES = {
  ADD_TO_BALANCE: '@accounts/ADD_TO_BALANCE',
  REMOVE_FROM_BALANCE: '@accounts/REMOVE_FROM_BALANCE',
  SET_ACCOUNT_FROM: '@accounts/SET_ACCOUNT_FROM',
  SET_ACCOUNT_TO: '@accounts/SET_ACCOUNT_TO',
};

export const addToBalance = (accountId: Account['id'], quantity: Account['balance']) => ({
  type: ACTIONS_TYPES.ADD_TO_BALANCE,
  payload: { accountId, quantity },
});

export const removeFromBalance = (accountId: Account['id'], quantity: Account['balance']) => ({
  type: ACTIONS_TYPES.REMOVE_FROM_BALANCE,
  payload: { accountId, quantity },
});

export const setAccountFrom = (accountId: Account['id']) => ({
  type: ACTIONS_TYPES.SET_ACCOUNT_FROM,
  payload: { accountId },
});

export const setAccountTo = (accountId: Account['id']) => ({
  type: ACTIONS_TYPES.SET_ACCOUNT_TO,
  payload: { accountId },
});
