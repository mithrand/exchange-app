/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { printCurrency } from '../../utils';
import * as styles from '../../stylesContants';

import { Account } from '../../types';

interface Props {
  currencyAccount: Account;
}

const BALANCE_PRECISION = 2;
const prinfBalance = printCurrency(BALANCE_PRECISION);

const balanceCss = css({
  fontFamily: styles.fontFamily.main,
  fontSize: styles.fontSizes.small,
  color: styles.colors.grey,
  marginTop: '0.75rem',
  width: '50%',
  display: 'inline-block',
});

const Balance = ({ currencyAccount: { currency, balance } }: Props) => (
  <div data-testid="balance" css={balanceCss}>{`Balance: ${prinfBalance(currency)(balance)}`}</div>
);

export default Balance;
