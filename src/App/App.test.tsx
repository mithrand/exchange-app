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

  it('App render as expected', async () => {
    const title = await screen.findAllByText('Sell EUR');
    expect(title).toHaveLength(1);

    screen.getByText('1 € = 0,8563 £');
    const exchangeButtons = screen.getAllByTestId('exchange-button');
    expect(exchangeButtons.length).toBe(2);
    within(exchangeButtons[0]).getByText('Balance: 1500,89 €');

    screen.getAllByText('Sell ⇊');
    screen.getAllByText('Sell EUR for GBP');
  });

  it('change account', async () => {
    let exchangeButtons = screen.getAllByTestId('exchange-button');
    const accountFromButton = within(exchangeButtons[0]).getByTestId(
      'account-button',
    );

    act(() => {
      userEvent.click(accountFromButton);
    });

    const accounts = screen.getAllByTestId('account-list-item');
    expect(accounts.length).toBe(3);

    act(() => {
      userEvent.click(within(accounts[2]).getByText('USD · 0,00'));
    });

    exchangeButtons = screen.getAllByTestId('exchange-button');
    within(exchangeButtons[0]).getByText('USD');
    within(exchangeButtons[0]).getByText('Balance: 0,00 $');
    screen.getByText('1 $ = 0,7309 £');
  });

  it('it change mode', async () => {
    let changeModeButton = screen.getByText('Sell ⇊');

    act(() => {
      userEvent.click(changeModeButton);
    });

    screen.getByText('Buy USD');
    screen.getByText('Buy GBP with USD');
    changeModeButton = screen.getByText('Buy ⇈');

    act(() => {
      userEvent.click(changeModeButton);
    });

    screen.getByText('Sell USD');
    screen.getByText('Sell USD for GBP');
    screen.getByText('Sell ⇊');
  });

  it('it show limit message when quantity > balance', async () => {
    const exchangeButtonFrom = screen.getAllByTestId('exchange-button')[0];
    const inputFrom = within(exchangeButtonFrom).getByTestId('quantity-input');
    inputFrom.focus({ preventScroll: true });
    userEvent.type(inputFrom, '1');
    within(exchangeButtonFrom).getByText('Balance is exceeded');

    act(() => {
      const changeModeButton = screen.getByText('Sell ⇊');
      userEvent.click(changeModeButton);
    });
  });
});
