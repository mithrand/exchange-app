import React from 'react';

import Title from './components/Title';
import ExchangeRate from './components/ExchangeRate';

const App = () => (
  <>
    <Title data-testid="title">Sell GBP</Title>
    <ExchangeRate data-testid="exchange-rate" />
  </>
);

export default App;
