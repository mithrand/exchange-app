import React from 'react';
import { Provider as StateProvider } from 'react-redux';
import store from '../store';

import GlobalStyles from '../components/GlobalStyles';
import Title from '../components/Title';
import ExchangeRate from '../components/ExchangeRate';
import ExchangeTo from '../components/ExchangeTo';
import ExchangeFrom from '../components/ExchangeFrom';
import AccountList from '../components/AccountList';

const App = () => (
  <StateProvider store={store}>
    <GlobalStyles />
    <Title>Sell GBP</Title>
    <ExchangeRate />
    <ExchangeFrom />
    <ExchangeTo />
    <AccountList />
  </StateProvider>
);


export default App;
