import React from 'react';
import { useToAccount } from '../../store/selectors';
import { useOpenModalDispatcher } from '../../store/dispatchers';
import { AccountType } from '../../types';

import ExchangeButton from '../ExchangeButton';

const ExchangeTo = () => {
  const openToModal = useOpenModalDispatcher(AccountType.to);
  const toAccount = useToAccount();
  return (
    <ExchangeButton
      currencyAccount={toAccount}
      onCurrencyButtonClick={openToModal}
    />
  );
};

export default ExchangeTo;
