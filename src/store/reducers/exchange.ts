import { ACTIONS_TYPES } from '../actions/exchange';
import { ExchangeMode, GenericAction, ExchangeRates } from '../../types';

export interface ExchangeState {
  mode: ExchangeMode;
  exchangeRates: ExchangeRates | null;
  quantityFrom?: number;
  quantityTo?: number;
}

export const initialState: ExchangeState = {
  mode: ExchangeMode.sell,
  exchangeRates: null,
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
