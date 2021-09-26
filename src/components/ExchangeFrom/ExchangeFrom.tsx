import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../store';
import { Account, AccountType } from '../../types';
import { openAccountList } from '../../store/actions/accounts';

import ExchangeButton from '../ExchangeButton';

const fromAccountSelector = (state: Store) =>
  state.accountsData.accounts.find(
    (acc) => acc.id === state.accountsData.from,
  ) || state.accountsData.accounts[0];

const openFromModal = (dispatch: ReturnType<typeof useDispatch>) => () =>
  dispatch(openAccountList(AccountType.from));

const ExchangeFrom = () => {
  const dispatch = useDispatch();
  const fromAccount: Account = useSelector<Store, Account>(fromAccountSelector);
  return (
    <ExchangeButton
      currencyAccount={fromAccount}
      onCurrencyButtonClick={openFromModal(dispatch)}
    />
  );
};

export default ExchangeFrom;
