import { ACTIONS_TYPES } from '../actions/exchange';
import {
  ExchangeMode,
  GenericAction,
  ExchangeRates,
  Quantity,
} from '../../types';

export interface ExchangeState {
  mode: ExchangeMode;
  exchangeRates: ExchangeRates | null;
  quantityFrom: Quantity;
  quantityTo: Quantity;
  confirmationMessageOpen: boolean;
}

export const initialState: ExchangeState = {
  mode: ExchangeMode.sell,
  exchangeRates: null,
  quantityFrom: 0,
  quantityTo: 0,
  confirmationMessageOpen: false,
};

const reducers = {
  [ACTIONS_TYPES.CHANGE_EXCHANGE_MODE]: (
    state: ExchangeState,
  ): ExchangeState => ({
    ...state,
    mode:
      state.mode === ExchangeMode.sell ? ExchangeMode.buy : ExchangeMode.sell,
  }),
  [ACTIONS_TYPES.UPDATE_EXCHANGE_RATES]: (
    state: ExchangeState,
    payload: { exchangeRates: ExchangeRates },
  ): ExchangeState => ({ ...state, exchangeRates: payload.exchangeRates }),
  [ACTIONS_TYPES.UPDATE_QUANTITY_FROM]: (
    state: ExchangeState,
    payload: { quantity: Quantity },
  ): ExchangeState => ({ ...state, quantityFrom: payload.quantity }),
  [ACTIONS_TYPES.UPDATE_QUANTITY_TO]: (
    state: ExchangeState,
    payload: { quantity: Quantity },
  ): ExchangeState => ({ ...state, quantityTo: payload.quantity }),
  [ACTIONS_TYPES.RESET_QUANTITIES]: (state: ExchangeState): ExchangeState => ({
    ...state,
    quantityFrom: 0,
    quantityTo: 0,
  }),
  [ACTIONS_TYPES.OPEN_CONFIRMATION_MESSAGE]: (state: ExchangeState): ExchangeState => ({
    ...state,
    confirmationMessageOpen: true,
  }),
  [ACTIONS_TYPES.CLOSE_CONFIRMATION_MESSAGE]: (state: ExchangeState): ExchangeState => ({
    ...state,
    confirmationMessageOpen: false,
  }),
  default: (state: ExchangeState) => state,
};

const exchangeReducer = (
  state: ExchangeState = initialState,
  action: GenericAction,
): ExchangeState => {
  const reducer = reducers[action.type] || reducers.default;
  return reducer(state, action.payload);
};

export default exchangeReducer;
