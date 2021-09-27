import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import accounts from '../../data/accounts';

const mockUseAccountIsOpen = jest.fn().mockImplementation(() => true);
const mockuseAccounts = jest.fn().mockImplementation(() => accounts);
const mockSelectAccountDispatcher = jest.fn();
const mockCloseListDispatcher = jest.fn();

jest.mock('../../store/selectors', () => ({
  useAccountIsOpen: mockUseAccountIsOpen,
  useAccounts: mockuseAccounts,
}));

jest.mock('../../store/dispatchers', () => ({
  useSelectAccountDispatcher: jest
    .fn()
    .mockImplementation(() => mockSelectAccountDispatcher),
  useCloseListDispatcher: jest
    .fn()
    .mockImplementation(() => mockCloseListDispatcher),
}));

import AccountList from './AccountList.container';

describe('AccountList', () => {
  beforeEach(() => {
    mockUseAccountIsOpen.mockClear().mockImplementation(() => true);
    mockuseAccounts.mockClear().mockImplementation(() => accounts);
  });
  it('AccountList show a list of accounts', async () => {
    render(<AccountList />);
    const accountsItems = await screen.findAllByTestId('account-list-item');
    expect(accountsItems).toHaveLength(accounts.length);
  });

  it('AccountList show account data', async () => {
    render(<AccountList />);
    const firstAccount = screen.getAllByTestId('account-list-item')[0];
    const currencyName = within(firstAccount).getAllByText('Euro');
    expect(currencyName).toHaveLength(1);
    const currencyCode = within(firstAccount).getAllByText('EUR · 1500,89');
    expect(currencyCode).toHaveLength(1);
  });

  it('on account click', async () => {
    render(<AccountList />);
    const firstAccount = screen.getAllByTestId('account-list-item')[0];
    userEvent.click(within(firstAccount).getByText('Euro'));
    expect(mockSelectAccountDispatcher).toBeCalledWith(accounts[0]);
  });

  it('on header close button click', async () => {
    render(<AccountList />);
    const header = screen.getByTestId('account-list-header');
    userEvent.click(within(header).getByTestId('close'));
    expect(mockCloseListDispatcher).toBeCalled();
  });

  it('on search content filter accounts', async () => {
    render(<AccountList />);
    const header = screen.getByTestId('account-list-header');
    userEvent.type(within(header).getByTestId('search'), 'D');
    const filteredAccounts = screen.getAllByTestId('account-list-item');
    expect(filteredAccounts.length).toBe(2);
    expect(within(filteredAccounts[0]).getAllByText('Sterling Pound').length).toBe(1);
    expect(within(filteredAccounts[1]).getAllByText('United States Dollard').length).toBe(1);
  });

  it('on clear search content all accounts are visible', async () => {
    render(<AccountList />);
    const header = screen.getByTestId('account-list-header');
    userEvent.type(within(header).getByTestId('search'), 'D');
    const filteredAccounts = screen.getAllByTestId('account-list-item');
    expect(filteredAccounts.length).toBe(2);
    const clearTextButton = screen.getByTestId('clear');
    userEvent.click(clearTextButton);
    const allAccounts = screen.getAllByTestId('account-list-item');
    expect(allAccounts.length).toBe(accounts.length);
  });
});
