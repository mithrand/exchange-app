/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import * as styles from '../../stylesContants';
import CurrencyButton from './CurrencyButton.ui';
import Balance from './Balance.ui';
import QuantityInput from './QuantityInput.ui';
import Message from './Message.ui';

import { CurrencyAccount } from '../../types';

export interface Props {
  currencyAccount: CurrencyAccount;
  quantity?: number;
  message?: string;
  onCurrencyButtonClick(): void;
}

const exchangeButtonCss = css({
  fontFamily: styles.fontFamily.main,
  backgroundColor: styles.colors.white,
  width: '95%',
  margin: styles.margin.normal,
  height: '2.5rem',
  borderRadius: '1rem',
  padding: '1rem',
  maxWidth: '450px',
  minWidth: '150px',
});

const ExchangeButton = ({
  currencyAccount,
  quantity,
  message,
  onCurrencyButtonClick,
}: Props) => (
  <div css={exchangeButtonCss}>
    <CurrencyButton
      currency={currencyAccount.currency}
      onClick={onCurrencyButtonClick}
    />
    <QuantityInput quantity={quantity} />
    <Balance currencyAccount={currencyAccount} />
    {message && <Message>{message}</Message>}
  </div>
);

export default ExchangeButton;
