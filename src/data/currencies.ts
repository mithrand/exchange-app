import { Currency } from '../types';

const currencies: Record<string, Currency> = {
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
