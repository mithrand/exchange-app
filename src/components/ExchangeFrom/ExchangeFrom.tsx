import React from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../store';
import { Account } from '../../types';

import ExchangeButton from '../ExchangeButton';

const ExchangeFrom = () => {
  const fromAccount: Account = useSelector<Store, Account>(
    (state) =>
      state.accountsData.accounts.find(
        (acc) => acc.id === state.accountsData.from,
      ) || state.accountsData.accounts[0],
  );
  const openFromModal = () => {};
  return (
    <ExchangeButton
      currencyAccount={fromAccount}
      onCurrencyButtonClick={openFromModal}
    />
  );
};

export default ExchangeFrom;
