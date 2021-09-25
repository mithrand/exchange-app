import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import currencies from '../../data/currencies';

import ExchangeButton, { Props } from './ExchangeButton.container';

describe('ExchangeButton', () => {
  const props: Props = {
    currencyAccount: {
      id: '12345',
      currency: currencies.GBP,
      balance: 10000.578,
    },
    message: 'this is a message',
    onCurrencyButtonClick: jest.fn(),
  };

  beforeEach(() => {
    (props.onCurrencyButtonClick as jest.Mock).mockReset();
  });

  it('ExchangeButton - currency button is rendered', async () => {
    render(<ExchangeButton {...props} />);
    const currencyButton = await screen.findAllByText('GBP');
    expect(currencyButton).toHaveLength(1);
  });

  it('ExchangeButton -  fire on click', async () => {
    render(<ExchangeButton {...props} />);
    userEvent.click(screen.getByTestId('currency-button'));
    expect(props.onCurrencyButtonClick).toHaveBeenCalled();
  });

  it('ExchangeButton -  fire on enter keyPress', async () => {
    render(<ExchangeButton {...props} />);
    fireEvent.keyPress(screen.getByTestId('currency-button'), { key: '1', charCode: 49 });
    expect(props.onCurrencyButtonClick).not.toHaveBeenCalled();
    fireEvent.keyPress(screen.getByTestId('currency-button'), { key: 'Enter', charCode: 13 });
    expect(props.onCurrencyButtonClick).toHaveBeenCalled();
  });

  it('ExchangeButton - currency button is rendered and fire click', async () => {
    render(<ExchangeButton {...props} />);
    const currencyButton = await screen.findAllByText('GBP');
    expect(currencyButton).toHaveLength(1);
    userEvent.click(screen.getByTestId('currency-button'));
    expect(props.onCurrencyButtonClick).toHaveBeenCalled();
  });

  it('ExchangeButton - balance is rendered', async () => {
    render(<ExchangeButton {...props} />);
    const balance = await screen.findAllByText('Balance: 10000,58 £');
    expect(balance).toHaveLength(1);
  });

  it('ExchangeButton - message is rendered with content', async () => {
    render(<ExchangeButton {...props} />);
    const message = await screen.getAllByTestId('message');
    expect(message).toHaveLength(1);
    const messageContent = await screen.findAllByText('this is a message');
    expect(messageContent).toHaveLength(1);
  });

  it('ExchangeButton - message is not rendered when no content', async () => {
    render(<ExchangeButton {...{ ...props, message: '' }} />);
    const message = await screen.queryAllByTestId('message');
    expect(message).toHaveLength(0);
  });

  it('ExchangeButton - quantity input is rendered', async () => {
    render(<ExchangeButton {...props} />);
    const quantityInput = await screen.getAllByTestId('quantity-input');
    expect(quantityInput).toHaveLength(1);
  });

  it('ExchangeButton - quantity input is rendered', async () => {
    render(<ExchangeButton {...{ ...props, quantity: 123456.5478 }} />);
    const quantityInput = await screen.getAllByDisplayValue('123456,55');
    expect(quantityInput).toHaveLength(1);
  });
});
