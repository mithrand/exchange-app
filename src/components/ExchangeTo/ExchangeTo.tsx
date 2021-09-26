import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../store';
import { Account, AccountType } from '../../types';
import { openAccountList } from '../../store/actions/accounts';

import ExchangeButton from '../ExchangeButton';

const toAccountSelector = (state: Store) =>
  state.accountsData.accounts.find((acc) => acc.id === state.accountsData.to) ||
  state.accountsData.accounts[0];

const openToModal = (dispatch: ReturnType<typeof useDispatch>) => () =>
  dispatch(openAccountList(AccountType.to));

const ExchangeTo = () => {
  const dispatch = useDispatch();
  const toAccount: Account = useSelector<Store, Account>(toAccountSelector);
  return (
    <ExchangeButton
      currencyAccount={toAccount}
      onCurrencyButtonClick={openToModal(dispatch)}
    />
  );
};

export default ExchangeTo;
