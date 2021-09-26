import { v4 as uuid } from 'uuid';
import currencies from './currencies';

const accounts = [
  {
    id: uuid(),
    currency: { ...currencies.EUR },
    balance: 1500.894,
  },
  {
    id: uuid(),
    currency: { ...currencies.GBP },
    balance: 120.57,
  },
  {
    id: uuid(),
    currency: { ...currencies.USD },
    balance: 0,
  },
];

export default accounts;
