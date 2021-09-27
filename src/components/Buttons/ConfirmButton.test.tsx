import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import accounts from '../../data/accounts';
import { ExchangeMode } from '../../types';

const mockUseFromAccount = jest.fn();
const mockUseToAccount = jest.fn();
const mockUseQuantityFrom = jest.fn();
const mockUseQuantityTo = jest.fn();
const mockExchangeMode = jest.fn();
const mockUseExchangeRates = jest.fn();
const mockSubmitExchangeDispatcher = jest.fn();

jest.mock('../../store/selectors', () => ({
  useFromAccount: mockUseFromAccount,
  useToAccount: mockUseToAccount,
  useExchangeMode: mockExchangeMode,
  useQuantityFrom: mockUseQuantityFrom,
  useQuantityTo: mockUseQuantityTo,
  useExchangeRates: mockUseExchangeRates,
}));

jest.mock('../../store/dispatchers', () => ({
  useSubmitExchangeDispatcher: jest
    .fn()
    .mockImplementation(() => mockSubmitExchangeDispatcher),
}));

import ConfirmButton from './ConfirmButton';

describe('ConfirmButton', () => {
  beforeEach(() => {
    mockUseFromAccount.mockClear().mockImplementation(() => accounts[0]);
    mockUseToAccount.mockClear().mockImplementation(() => accounts[1]);
    mockUseQuantityFrom.mockClear().mockImplementation(() => 100);
    mockUseQuantityTo.mockClear().mockImplementation(() => 300);
    mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.sell);
    mockUseExchangeRates.mockClear().mockImplementation(() => ({
      EUR: 1,
      USD: 2,
      GBP: 3,
    }));
  });

  it('on click submit Exchange ', () => {
    render(<ConfirmButton />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(mockSubmitExchangeDispatcher).toBeCalled();
  });

  it('shows Sell EUR for GBP text on sell mode', () => {
    mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.sell);
    render(<ConfirmButton />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Sell EUR for GBP');
  });

  it('shows Buy GBP with EUR text on sell mode', () => {
    mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.buy);
    render(<ConfirmButton />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Buy GBP with EUR');
  });

  it('Is enabled', () => {
    render(<ConfirmButton />);
    const button = screen.getByRole('button');
    expect(button.hasAttribute('disabled')).not.toBe(true);
  });

  describe('Disabled status test', () => {
    it('is disable if no exchange rates', () => {
      mockUseExchangeRates.mockClear().mockImplementation(() => null);
      render(<ConfirmButton />);
      const button = screen.getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('is disable if both accounts are the same', () => {
      mockUseToAccount.mockClear().mockImplementation(() => accounts[0]);
      render(<ConfirmButton />);
      const button = screen.getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('is disabled if quantity from < balance in sell mode', () => {
      mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.sell);
      mockUseQuantityFrom
        .mockClear()
        .mockImplementation(() => accounts[0].balance + 1);
      render(<ConfirmButton />);
      const button = screen.getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('is disabled if quantity to < balance in buy mode', () => {
      mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.buy);
      mockUseQuantityTo
        .mockClear()
        .mockImplementation(() => accounts[1].balance + 1);
      render(<ConfirmButton />);
      const button = screen.getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });
  });
});
