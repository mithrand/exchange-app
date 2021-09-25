import { Currency } from '../types';

export const getCurrencyShort = (currency: Currency) =>
  currency.symbol || currency.code;

export const printCurrency =
  (precision: number) => (currency: Currency) => (value: number) =>
    `${value
      .toFixed(precision)
      .toString()
      .replace('.', ',')} ${getCurrencyShort(currency)}`;

export const printQuantity = (precision: number) => (value: number) =>
  `${value.toFixed(precision).toString().replace('.', ',')}`;

// eslint-disable-next-line no-console
export const notifyError = (error: Error) => console.error(error);
