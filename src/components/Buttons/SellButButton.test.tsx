import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExchangeMode } from '../../types';

const mockExchangeMode = jest.fn();
const mockChangeExchangeModeDispatcher = jest.fn();

jest.mock('../../store/selectors', () => ({
  useExchangeMode: mockExchangeMode,
}));

jest.mock('../../store/dispatchers', () => ({
  useChangeExchangeModeDispatcher: jest
    .fn()
    .mockImplementation(() => mockChangeExchangeModeDispatcher),
}));

import SellBuyButton from './SellBuyButton';

describe('SellBuyButton', () => {
  beforeEach(() => {
    mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.sell);
  });

  it('on click change exchange mode ', () => {
    render(<SellBuyButton />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(mockChangeExchangeModeDispatcher).toBeCalled();
  });

  it('shows Sell EUR for GBP text on sell mode', () => {
    mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.sell);
    render(<SellBuyButton />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Sell ⇊');
  });

  it('shows Buy GBP with EUR text on sell mode', () => {
    mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.buy);
    render(<SellBuyButton />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Buy ⇈');
  });
});
