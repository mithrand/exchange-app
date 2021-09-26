import React from 'react';
import { useOpenModalDispatcher } from '../../store/dispatchers';
import { useFromAccount } from '../../store/selectors';
import { AccountType } from '../../types';

import ExchangeButton from '../ExchangeButton';

const ExchangeFrom = () => {
  const openFromModal = useOpenModalDispatcher(AccountType.from);
  const fromAccount = useFromAccount();
  return (
    <ExchangeButton
      currencyAccount={fromAccount}
      onCurrencyButtonClick={openFromModal}
    />
  );
};

export default ExchangeFrom;
