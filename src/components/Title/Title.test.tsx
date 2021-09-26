import React from 'react';
import { render, screen } from '@testing-library/react';
import { Account, ExchangeMode } from '../../types';

const mockUseExchangeMode = jest.fn();
const mockUseFromAccount = jest.fn();

jest.mock('../../store/selectors', () => ({
  useExchangeMode: mockUseExchangeMode,
  useFromAccount: mockUseFromAccount,
}));

import Title from './Title.container';

const mockedAccount: Account = {
  id: '1234',
  currency: {
    symbol: '$',
    code: 'USD',
    name: 'USD',
  },
  balance: 1234,
};

describe('Title', () => {
  beforeEach(() => {
    mockUseExchangeMode.mockClear().mockImplementation(() => ExchangeMode.sell);
    mockUseFromAccount.mockClear().mockImplementation(() => mockedAccount);
  });

  it('Title render correct text when mode is sell', async () => {
    const text = 'Sell USD';
    render(<Title />);
    const title = await screen.findAllByText(text);
    expect(title).toHaveLength(1);
  });

  it('Title render correct text when mode is buy', async () => {
    mockUseExchangeMode.mockClear().mockImplementation(() => ExchangeMode.buy);
    const text = 'Buy USD';
    render(<Title />);
    const title = await screen.findAllByText(text);
    expect(title).toHaveLength(1);
  });
});
