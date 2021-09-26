import { compose } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export enum AccountType {
  from = 'from',
  to = 'to',
}

export enum ExchangeMode {
  sell = 'sell',
  buy = 'buy',
}

export type Quantity = number | null;

export type ExchangeRates = Record<string, number>;

export interface Currency {
  symbol?: string;
  code: string;
  name: string;
}

export interface Account {
  id: string;
  currency: Currency;
  balance: number;
}

export interface GenericAction {
  type: string;
  payload: any;
}
