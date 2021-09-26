import { ExchangeRates } from '../../types';

export const ACTIONS_TYPES = {
  CHANGE_EXCHANGE_MODE: '@exchange/CHANGE_EXCHANGE_MODE',
  UPDATE_EXCHANGE_RATES: '@exchange/UPDATE_EXCHANGE_RATES',
};

export const changeExchangeMode = () => ({
  type: ACTIONS_TYPES.CHANGE_EXCHANGE_MODE,
  payload: {},
});

export const updateExchangeRates = (exchangeRates: ExchangeRates) => ({
  type: ACTIONS_TYPES.UPDATE_EXCHANGE_RATES,
  payload: { exchangeRates },
});
