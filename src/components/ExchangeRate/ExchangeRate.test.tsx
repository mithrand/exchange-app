import React from 'react';
import { render, screen } from '@testing-library/react';

const mockUseExchangeRate = jest.fn();
const mockUseFromAccount = jest.fn();
const mockUseToAccount = jest.fn();

jest.mock('../../store/selectors', () => ({
  useExchangeRate: mockUseExchangeRate,
  useFromAccount: mockUseFromAccount,
  useToAccount: mockUseToAccount,
}));

import ExchangeRate from './ExchangeRate.container';
import { Account } from '../../types';


const mockedAccountFrom: Account = {
  id: '1234',
  currency: {
    symbol: '€',
    code: 'EUR',
    name: 'Euro',
  },
  balance: 1234,
};

const mockedAccountTo: Account = {
  id: '1234',
  currency: {
    symbol: '£',
    code: 'GBP',
    name: 'British Sterling Pound',
  },
  balance: 1234,
};

describe('ExchangeRate', () => {
  beforeEach(() => {
    mockUseExchangeRate.mockClear().mockImplementation(() => 0.85634);
    mockUseFromAccount.mockClear().mockImplementation(() => mockedAccountFrom);
    mockUseToAccount.mockClear().mockImplementation(() => mockedAccountTo);
  });

  it('ExchangeRate renders', async () => {
    const text = '1 € = 0,8563 £';
    render(<ExchangeRate />);
    const content = await screen.findAllByText(text);
    expect(content).toHaveLength(1);
  });
});
