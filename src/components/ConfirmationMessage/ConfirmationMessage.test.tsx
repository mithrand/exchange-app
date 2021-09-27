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
const mockUseConfirmationMessageState = jest.fn();
const MockCloseConfirmationMessageDispatcher = jest.fn();

jest.mock('../../store/selectors', () => ({
  useFromAccount: mockUseFromAccount,
  useToAccount: mockUseToAccount,
  useExchangeMode: mockExchangeMode,
  useQuantityFrom: mockUseQuantityFrom,
  useQuantityTo: mockUseQuantityTo,
  useConfirmationMessageState: mockUseConfirmationMessageState,
}));

jest.mock('../../store/dispatchers', () => ({
  useCloseConfirmationMessageDispatcher: jest
    .fn()
    .mockImplementation(() => MockCloseConfirmationMessageDispatcher),
}));

import ConfirmationMessage from './ConfirmationMessage.container';

describe('ConfirmationMessage', () => {
  beforeEach(() => {
    mockUseFromAccount.mockClear().mockImplementation(() => accounts[0]);
    mockUseToAccount.mockClear().mockImplementation(() => accounts[1]);
    mockUseQuantityFrom.mockClear().mockImplementation(() => 100);
    mockUseQuantityTo.mockClear().mockImplementation(() => 300);
    mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.sell);
    mockUseConfirmationMessageState.mockClear().mockImplementation(() => true);
  });

  it('confirmation message on sell mode', () => {
    render(<ConfirmationMessage />);
    expect(screen.getByText('You exchanged'));
    expect(screen.getByText('100,00 € to 300,00 £'));
  });

  it('confirmation message on buy mode', () => {
    mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.buy);
    render(<ConfirmationMessage />);
    expect(screen.getByText('You exchanged'));
    expect(screen.getByText('300,00 £ to 100,00 €'));
  });

  it('confirmation message on buy mode', () => {
    render(<ConfirmationMessage />);
    userEvent.click(screen.getByTestId('confiramtion-message'));
    expect(MockCloseConfirmationMessageDispatcher).toBeCalled();
  });
});
