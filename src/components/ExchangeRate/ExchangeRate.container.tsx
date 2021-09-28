import React from 'react';
import {
  useExchangeRate,
  useFromAccount,
  useToAccount,
} from '../../store/selectors';

import ExchangeRate from './ExchangeRate.ui';

const ExchangeRateContainer = () => {
  const accountFrom = useFromAccount();
  const accountTo = useToAccount();
  const rate = useExchangeRate();
  return (
    <ExchangeRate
      from={accountFrom.currency}
      to={accountTo.currency}
      exchangeRate={rate}
    />
  );
};

export default ExchangeRateContainer;
