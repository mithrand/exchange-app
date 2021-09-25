import { Currency } from '../types';

export const getCurrencyShort = (currency: Currency) =>
  currency.symbol || currency.code;

export const printCurrency =
  (precision: number) => (currency: Currency) => (value: number) =>
    `${value.toFixed(precision).toString()} ${getCurrencyShort(currency)}`;
