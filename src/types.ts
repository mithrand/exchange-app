import { compose } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface Currency {
  symbol?: string;
  code: string;
  name: string;
}

export interface GenericAction {
  type: string;
  payload: any;
}

export interface Account {
  id: string;
  currency: Currency;
  balance: number;
}
