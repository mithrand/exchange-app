import reducer, { initialState } from './accounts';

import {
  addToBalance,
  removeFromBalance,
  setAccountFrom,
  setAccountTo,
  openAccountList,
  closeAccountList,
} from '../actions/accounts';

import { AccountType } from '../../types';

describe('Account reducer', () => {
  it('not mapped reducer return same state', async () => {
    const finalState = reducer(initialState, {
      type: 'NOT_MAPPER',
      payload: {},
    });
    expect(finalState).toBe(initialState);
  });

  it('addToBalance add quantity to account balance', async () => {
    const account = initialState.accounts[1];
    const action = addToBalance(account.id, 100);
    const finalState = reducer(initialState, action);
    expect(finalState.accounts[1].balance).toBe(account.balance + 100);
  });

  it('addToBalance remove quantity to account balance', async () => {
    const account = initialState.accounts[1];
    const action = removeFromBalance(account.id, 100);
    const finalState = reducer(initialState, action);
    expect(finalState.accounts[1].balance).toBe(account.balance - 100);
  });

  it('setAccountFrom set the new account', async () => {
    const account = initialState.accounts[1];
    const action = setAccountFrom(account.id);
    const finalState = reducer(initialState, action);
    expect(finalState.from).toBe(account.id);
  });

  it('do not setAccountFrom for non existing accounts', async () => {
    const action = setAccountFrom('fakeAccount');
    const finalState = reducer(initialState, action);
    expect(finalState.from).toBe(initialState.from);
  });

  it('setAccountTo set the new account', async () => {
    const account = initialState.accounts[2];
    const action = setAccountTo(account.id);
    const finalState = reducer(initialState, action);
    expect(finalState.to).toBe(account.id);
  });

  it('do not setAccountTo for non existing accounts', async () => {
    const action = setAccountTo('fakeAccount');
    const finalState = reducer(initialState, action);
    expect(finalState.to).toBe(initialState.to);
  });

  it('Open / close account list', async () => {
    // open as 'from'
    expect(initialState.isAccountListOpen).toBe(false);
    const openActionFrom = openAccountList(AccountType.from);
    let state = reducer(initialState, openActionFrom);
    expect(state.isAccountListOpen).toBe(true);
    expect(state.accountListMode).toBe(AccountType.from);

    // close
    const closeAction = closeAccountList();
    state = reducer(initialState, closeAction);
    expect(state.isAccountListOpen).toBe(false);
    expect(state.accountListMode).toBe('');

    // open as 'to'
    const openActionTo = openAccountList(AccountType.to);
    state = reducer(initialState, openActionTo);
    expect(state.isAccountListOpen).toBe(true);
    expect(state.accountListMode).toBe(AccountType.to);
  });
});
