/* eslint-disable prefer-destructuring */
import React from 'react';
import 'isomorphic-fetch';
import {
 render, screen, within, act, cleanup,
} from '@testing-library/react';
import nock from 'nock';

import userEvent from '@testing-library/user-event';
import config from '../config';
import { ExchangeRates } from '../types';

jest.setTimeout(30 * 1000);

const mockedExchangeRates: ExchangeRates = {
  EUR: 1,
  USD: 1.17164,
  GBP: 0.85634,
};

const waitForSec = (sec: number) =>
  new Promise((res) => setTimeout(res, sec * 1000));

// Mock for API request
nock(config.exchangeAPIurl)
  .persist()
  .get('/exchangeRates')
  .reply(200, mockedExchangeRates);

import App from './App';

describe('App', () => {
  beforeEach(async () => {
    cleanup();
    act(() => {
      render(<App />);
    });
    await waitForSec(1);
  });

  it('Sell 1 Euro to GBP', async () => {
    let exchangeButtonFrom = screen.getAllByTestId('exchange-button')[0];
    within(exchangeButtonFrom).getByText('Balance: 1500,89 €');
    let exchangeButtonTo = screen.getAllByTestId('exchange-button')[1];
    within(exchangeButtonTo).getByText('Balance: 120,57 £');
    const inputFrom = within(exchangeButtonFrom).getByTestId('quantity-input');
    inputFrom.focus({ preventScroll: true });
    userEvent.type(inputFrom, '1');

    act(() => {
      const sellButton = screen.getByText('Sell EUR for GBP');
      userEvent.click(sellButton);
    });

    const confirmationMessage = screen.getByTestId('confirmation-message');
    within(confirmationMessage).getByText('You exchanged');
    within(confirmationMessage).getByText('1,00 € to 0,86 £');
    userEvent.click(confirmationMessage);

    exchangeButtonFrom = screen.getAllByTestId('exchange-button')[0];
    within(exchangeButtonFrom).getByText('Balance: 1499,89 €');
    exchangeButtonTo = screen.getAllByTestId('exchange-button')[1];
    within(exchangeButtonTo).getByText('Balance: 121,43 £');
  });

  it('Buy 1 GBP Euro with EUR', async () => {
    let exchangeButtonFrom = screen.getAllByTestId('exchange-button')[0];
    within(exchangeButtonFrom).getByText('Balance: 1499,89 €');
    let exchangeButtonTo = screen.getAllByTestId('exchange-button')[1];
    within(exchangeButtonTo).getByText('Balance: 121,43 £');
    const inputFrom = within(exchangeButtonTo).getByTestId('quantity-input');
    inputFrom.focus({ preventScroll: true });
    userEvent.type(inputFrom, '1');

    act(() => {
      const changeModeButton = screen.getByText('Sell ⇊');
      userEvent.click(changeModeButton);
    });

    act(() => {
      const sellButton = screen.getByText('Buy GBP with EUR');
      userEvent.click(sellButton);
    });

    const confirmationMessage = screen.getByTestId('confirmation-message');
    within(confirmationMessage).getByText('You exchanged');
    within(confirmationMessage).getByText('1,00 £ to 1,17 €');
    userEvent.click(confirmationMessage);

    exchangeButtonFrom = screen.getAllByTestId('exchange-button')[0];
    within(exchangeButtonFrom).getByText('Balance: 1501,06 €');
    exchangeButtonTo = screen.getAllByTestId('exchange-button')[1];
    within(exchangeButtonTo).getByText('Balance: 120,43 £');
  });
});
