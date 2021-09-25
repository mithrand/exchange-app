import React from 'react';

import ExchangeRate from './ExchangeRate.ui';
import currencies from '../../data/currencies';

const ExchangeRateContainer = () => (
  <ExchangeRate from={currencies.EUR} to={currencies.GBP} rate={1.170541} />
);

export default ExchangeRateContainer;
