import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import currencies from '../../data/currencies';

import ExchangeButton, { Props } from './ExchangeButton.container';


describe('ExchangeButton', () => {
  const props: Props = {
    account: {
      id: '12345',
      currency: currencies.GBP,
      balance: 10000.578,
    },
    quantity: null,
    isNegative: false,
    onCurrencyButtonClick: jest.fn(),
    onQuantityChange: jest.fn(),
  };

  beforeEach(() => {
    (props.onCurrencyButtonClick as jest.Mock).mockReset();
  });

  describe('Currency button', () => {
    it('renders', async () => {
      render(<ExchangeButton {...props} />);
      screen.getByText('GBP');
    });

    it('fire on click', async () => {
      render(<ExchangeButton {...props} />);
      userEvent.click(screen.getByTestId('currency-button'));
      expect(props.onCurrencyButtonClick).toHaveBeenCalled();
    });

    it('fire on enter keyPress', async () => {
      render(<ExchangeButton {...props} />);
      fireEvent.keyPress(screen.getByTestId('currency-button'), {
        key: '1',
        charCode: 49,
      });
      expect(props.onCurrencyButtonClick).not.toHaveBeenCalled();
      fireEvent.keyPress(screen.getByTestId('currency-button'), {
        key: 'Enter',
        charCode: 13,
      });
      expect(props.onCurrencyButtonClick).toHaveBeenCalled();
    });
  });

  describe('Balance', () => {
    it('is rendered', async () => {
      render(<ExchangeButton {...props} />);
      const balance = screen.getAllByText('Balance: 10000,58 £');
      expect(balance).toHaveLength(1);
    });
  });

  describe('Quantity input', () => {
    it('is rendered', async () => {
      render(<ExchangeButton {...props} />);
      const quantityInput = screen.getAllByTestId('quantity-input');
      expect(quantityInput).toHaveLength(1);
    });

    it('is show positive number', async () => {
      render(<ExchangeButton {...{ ...props, quantity: 123456.5478 }} />);
      const quantityInput = screen.getAllByDisplayValue('+123.456,55');
      expect(quantityInput).toHaveLength(1);
    });

    it('is show positive number', async () => {
      render(
        <ExchangeButton
          {...{ ...props, quantity: 123456.5478, isNegative: true }}
        />,
      );
      const quantityInput = screen.getAllByDisplayValue('-123.456,55');
      expect(quantityInput).toHaveLength(1);
    });

    xit('message is rendered with content', async () => {
      render(<ExchangeButton {...props} />);
      const quantityInput = screen.getByTestId('quantity-input');
      quantityInput.focus();
      userEvent.click(quantityInput);
      userEvent.type(quantityInput, '1000000000');
      const messageContent = await screen.findAllByText('Balance is exceeded');
      expect(messageContent).toHaveLength(1);
    });
  });
});
