import reducer, { initialState } from './exchange';

import { changeExchangeMode } from '../actions/exchange';

import { ExchangeMode } from '../../types';

describe('exchange reducer', () => {
  it('not mapped reducer return same state', async () => {
    const finalState = reducer(initialState, {
      type: 'NOT_MAPPER',
      payload: {},
    });
    expect(finalState).toBe(initialState);
  });

  it('changeExchangeMode swap between exchange modes', async () => {
    const action = changeExchangeMode();
    expect(initialState.mode).toBe(ExchangeMode.sell);

    let finalState = reducer(initialState, action);
    expect(finalState.mode).toBe(ExchangeMode.buy);

    finalState = reducer(finalState, action);
    expect(finalState.mode).toBe(ExchangeMode.sell);
  });
});
