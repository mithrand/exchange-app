import { KeyboardEvent } from 'react';
import {
 calculateExchageRate, getCurrencyShort, onKeysPressHelper, printCurrency, printQuantity,
} from './utils';
import { Currency } from '../types';
import currencies from '../data/currencies';


describe('utils', () => {
  it('getCurrencyShort return symbol when exist code if not', async () => {
    const currencyWithSymbol: Currency = {
      symbol: '$',
      code: 'USD',
      name: 'United States Dollar',
    };

    const currencyWithoutSymbol: Currency = {
      code: 'GBP',
      name: 'British Sterling Pound',
    };

    expect(getCurrencyShort(currencyWithSymbol)).toBe('$');
    expect(getCurrencyShort(currencyWithoutSymbol)).toBe('GBP');
  });

  it('printCurrent return currency formated', async () => {
    const currency: Currency = {
      symbol: '$',
      code: 'USD',
      name: 'United States Dollar',
    };
    const precision = 5;
    const value = 1.1234567;

    expect(printCurrency(precision)(currency)(value)).toBe('1,12346 $');
  });

  it('printQuantity return cuantity formated', async () => {
    const precision = 2;
    const value = 1.1234567;
    expect(printQuantity(precision)(value)).toBe('1,12');
  });

  it('onKeysPressHelper trigger callback on return key press', async () => {
    const cb = jest.fn();
    const handler = onKeysPressHelper(cb);
    const event = (({ key: 'Enter' }) as unknown) as KeyboardEvent<HTMLDivElement>;
    handler(event);
    expect(cb).toHaveBeenCalled();
  });

  it('onKeysPressHelper trigger callback on return key press', async () => {
    const cb = jest.fn();
    const handler = onKeysPressHelper(cb);
    const event = (({ key: '13' }) as unknown) as KeyboardEvent<HTMLDivElement>;
    handler(event);
    expect(cb).not.toHaveBeenCalled();
  });

  it('calculateExchageRate calculare rate properly', async () => {
    const exchangeRates = {
      EUR: 1,
      GBP: 2,
    };

    expect(calculateExchageRate(exchangeRates, currencies.EUR, currencies.GBP)).toBe(2);
    expect(calculateExchageRate(exchangeRates, currencies.GBP, currencies.EUR)).toBe(0.5);
  });
});
