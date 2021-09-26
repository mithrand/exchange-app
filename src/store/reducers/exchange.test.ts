import reducer, { initialState } from './exchange';

import {
  changeExchangeMode,
  updateExchangeRates,
  updateQuantityFrom,
  updateQuantityTo,
} from '../actions/exchange';

import { ExchangeMode, ExchangeRates } from '../../types';

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

  it('updateExchangeRates update exchange rates', async () => {
    const exchangeRates: ExchangeRates = {
      EUR: 1,
      GBP: 0.8563,
      USD: 1.1716,
    };
    const action = updateExchangeRates(exchangeRates);
    const finalState = reducer(initialState, action);
    expect(initialState.exchangeRates).toBe(null);
    expect(finalState.exchangeRates).toBe(exchangeRates);
  });

  it('updateQuantityFrom update quantityFrom', async () => {
    const action = updateQuantityFrom(150.53);
    const finalState = reducer(initialState, action);
    expect(initialState.quantityFrom).toBe(0);
    expect(finalState.quantityFrom).toBe(150.53);
  });

  it('updateQuantityTo update quantityTo', async () => {
    const action = updateQuantityTo(150.53);
    const finalState = reducer(initialState, action);
    expect(initialState.quantityTo).toBe(0);
    expect(finalState.quantityTo).toBe(150.53);
  });
});
