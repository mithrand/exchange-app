import { ACTIONS_TYPES } from '../actions/exchange';
import { ExchangeMode, GenericAction } from '../../types';

export interface ExchangeState {
  mode: ExchangeMode;
}

export const initialState: ExchangeState = {
  mode: ExchangeMode.sell,
};

const reducers = {
  [ACTIONS_TYPES.CHANGE_EXCHANGE_MODE]: (
    state: ExchangeState,
  ): ExchangeState => ({
    ...state,
    mode: state.mode === ExchangeMode.sell ? ExchangeMode.buy : ExchangeMode.sell,
  }),
  default: (state: ExchangeState) => state,
};

const exchangeReducer = (
  state: ExchangeState = initialState,
  action: GenericAction,
): ExchangeState => {
  const reducer = reducers[action.type] || reducers.default;
  return reducer(state);
};

export default exchangeReducer;
