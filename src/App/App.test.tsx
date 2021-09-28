import React from 'react';
import 'isomorphic-fetch';
import { render, screen } from '@testing-library/react';
import nock from 'nock';

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
  it('App render as expected', async () => {
    render(<App />);
    const title = await screen.findAllByText('Sell EUR');
    expect(title).toHaveLength(1);
    screen.getByText('loading');
    await waitForSec(1);
    screen.getByText('1 € = 0,8563 £');
    const exchangeButtons = screen.getAllByTestId('exchange-button');
    expect(exchangeButtons.length).toBe(2);
  });
});
