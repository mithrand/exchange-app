/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import * as styles from '../../stylesContants';
import CurrencyButton from './CurrencyButton.ui';
import Balance from './Balance.ui';
import QuantityInput from './QuantityInput.ui';
import Message from './Message.ui';

import { Account, Quantity } from '../../types';

export interface Props {
  account: Account;
  quantity: Quantity;
  message?: string;
  isNegative: boolean;
  alert: boolean;
  onCurrencyButtonClick(): void;
  onQuantityChange(quantity: Quantity): void;
  checkValue(quantity: Quantity): void;
}

const exchangeButtonCss = (alert: boolean) =>
  css({
    fontFamily: styles.fontFamily.main,
    backgroundColor: alert ? styles.backgroundColors.red : styles.colors.white,
    width: '95%',
    margin: styles.margin.normal,
    height: '2.5rem',
    borderRadius: '1rem',
    padding: '1rem',
    maxWidth: '450px',
    minWidth: '150px',
    boxShadow:
      'rgb(181 198 221 / 12%) 0px 0.7rem 1.3rem 0px, rgb(234 234 235 / 24%) 0px 1rem 2.2rem 0px',
  });

const ExchangeButton = ({
  account: currencyAccount,
  quantity,
  message,
  isNegative,
  alert,
  onCurrencyButtonClick,
  onQuantityChange,
  checkValue,
}: Props) => (
  <div css={exchangeButtonCss(alert)}>
    <CurrencyButton
      currency={currencyAccount.currency}
      onClick={onCurrencyButtonClick}
    />
    <QuantityInput
      quantity={quantity}
      updateQuantity={onQuantityChange}
      isNegative={isNegative}
      checkValue={checkValue}
    />
    <Balance currencyAccount={currencyAccount} />
    {message && <Message alert={alert}>{message}</Message>}
  </div>
);

export default ExchangeButton;
