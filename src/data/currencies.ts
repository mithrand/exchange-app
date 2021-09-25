import { Currency } from '../types';

type CurrencyIndex = 'GBP' | 'EUR' | 'USD';

const currencies: Record<CurrencyIndex, Currency> = {
  EUR: {
    symbol: '€',
    code: 'EUR',
    name: 'Euro',
  },
  GBP: {
    symbol: '£',
    code: 'GBP',
    name: 'Sterling Pound',
  },
  USD: {
    symbol: '$',
    code: 'USD',
    name: 'United States Dollard',
  },
};

export default currencies;
