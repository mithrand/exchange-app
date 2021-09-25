import React from 'react';

import GlobalStyles from './components/GlobalStyles';
import Title from './components/Title';
import ExchangeRate from './components/ExchangeRate';
import ExchangeButton, {
  Props as ExchangeButtonProps,
} from './components/ExchangeButton';
import currencies from './data/currencies';

const exchangeButtonPropsA: ExchangeButtonProps = {
  currencyAccount: {
    currency: currencies.GBP,
    balance: 10000.578,
  },
  message: 'this is a message',
  onCurrencyButtonClick: () => {
    alert('Click');
  },
};

const exchangeButtonPropsB: ExchangeButtonProps = {
  currencyAccount: {
    currency: currencies.EUR,
    balance: 150.999,
  },
  message: 'this is a message',
  onCurrencyButtonClick: () => {
    alert('Click');
  },
};

const App = () => (
  <>
    <GlobalStyles />
    <Title data-testid="title">Sell GBP</Title>
    <ExchangeRate data-testid="exchange-rate" />
    <ExchangeButton {...exchangeButtonPropsA} />
    <ExchangeButton {...exchangeButtonPropsB} />
  </>
);

export default App;
