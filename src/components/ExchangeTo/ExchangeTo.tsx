import React from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../store';
import { Account } from '../../types';

import ExchangeButton from '../ExchangeButton';

const ExchangeTo = () => {
  const fromAccount: Account = useSelector<Store, Account>(
    (state) =>
      state.accountsData.accounts.find(
        (acc) => acc.id === state.accountsData.to,
      ) || state.accountsData.accounts[0],
  );
  const openToModal = () => {};
  return (
    <ExchangeButton
      currencyAccount={fromAccount}
      onCurrencyButtonClick={openToModal}
    />
  );
};

export default ExchangeTo;
