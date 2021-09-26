import { ExchangeRates, Quantity } from '../../types';

export const ACTIONS_TYPES = {
  CHANGE_EXCHANGE_MODE: '@exchange/CHANGE_EXCHANGE_MODE',
  UPDATE_EXCHANGE_RATES: '@exchange/UPDATE_EXCHANGE_RATES',
  UPDATE_QUANTITY_FROM: '@exchange/UPDATE_QUANTITY_FROM',
  UPDATE_QUANTITY_TO: '@exchange/UPDATE_QUANTITY_TO',
  RESET_QUANTITIES: '@exchange/RESET_QUANTITIES',
  OPEN_CONFIRMATION_MESSAGE: '@exchange/OPEN_CONFIRMATION_MESSAGE',
  CLOSE_CONFIRMATION_MESSAGE: '@exchange/CLOSE_CONFIRMATION_MESSAGE',
};

export const changeExchangeMode = () => ({
  type: ACTIONS_TYPES.CHANGE_EXCHANGE_MODE,
  payload: {},
});

export const updateExchangeRates = (exchangeRates: ExchangeRates) => ({
  type: ACTIONS_TYPES.UPDATE_EXCHANGE_RATES,
  payload: { exchangeRates },
});

export const updateQuantityFrom = (quantity: Quantity) => ({
  type: ACTIONS_TYPES.UPDATE_QUANTITY_FROM,
  payload: { quantity },
});

export const updateQuantityTo = (quantity: Quantity) => ({
  type: ACTIONS_TYPES.UPDATE_QUANTITY_TO,
  payload: { quantity },
});

export const resetQuantities = () => ({
  type: ACTIONS_TYPES.RESET_QUANTITIES,
  payload: {},
});

export const openConfirmationMessage = () => ({
  type: ACTIONS_TYPES.OPEN_CONFIRMATION_MESSAGE,
  payload: {},
});


export const closeConfirmationMessage = () => ({
  type: ACTIONS_TYPES.CLOSE_CONFIRMATION_MESSAGE,
  payload: {},
});
