import { getCurrencyShort } from './utils';
import { Currency } from '../types';

describe('utils', () => {
  it('getCurrencyShor return symbol when exist code if not', async () => {
    const CurrencyWithSymbol: Currency = {
      symbol: '$',
      code: 'USD',
      name: 'United States Dollar',
    };

    const CurrencyWithoutSymbol: Currency = {
      code: 'GBP',
      name: 'British Sterling Pound',
    };

    expect(getCurrencyShort(CurrencyWithSymbol)).toBe('$');
    expect(getCurrencyShort(CurrencyWithoutSymbol)).toBe('GBP');
  });
});
