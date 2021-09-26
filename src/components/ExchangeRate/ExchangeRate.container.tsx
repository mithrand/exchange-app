import React from 'react';
import {
  useExchangeRate,
  useFromAccount,
  useToAccount,
} from '../../store/selectors';
import { calculateExchageRate } from '../../utils';

import ExchangeRate from './ExchangeRate.ui';

const ExchangeRateContainer = () => {
  const exchangeRate = useExchangeRate();
  const accountFrom = useFromAccount();
  const accountTo = useToAccount();
  const rate = exchangeRate
    ? calculateExchageRate(
        exchangeRate,
        accountFrom.currency,
        accountTo.currency,
      )
    : null;
  return (
    <ExchangeRate
      from={accountFrom.currency}
      to={accountTo.currency}
      rate={rate}
    />
  );
};

export default ExchangeRateContainer;
