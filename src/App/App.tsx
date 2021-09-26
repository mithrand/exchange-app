import React from 'react';
import { Provider as StateProvider } from 'react-redux';
import store from '../store';

import ExchangeRatesProvider from '../providers/ExchangeRatesProvider';
import GlobalStyles from '../components/GlobalStyles';
import Title from '../components/Title';
import ExchangeRate from '../components/ExchangeRate';
import ExchangeTo from '../components/ExchangeTo';
import SellBuyButton from '../components/Buttons/SellBuyButton';
import ExchangeFrom from '../components/ExchangeFrom';
import ConfirmButton from '../components/Buttons/ConfirmButton';
import AccountList from '../components/AccountList';


const App = () => (
  <StateProvider store={store}>
    <ExchangeRatesProvider />
    <GlobalStyles />
    <Title />
    <ExchangeRate />
    <ExchangeFrom />
    <SellBuyButton />
    <ExchangeTo />
    <ConfirmButton />
    <AccountList />
  </StateProvider>
);


export default App;
