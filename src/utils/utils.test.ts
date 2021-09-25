import { getCurrencyShort, printCurrency } from './utils';
import { Currency } from '../types';

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
});
