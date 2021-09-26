/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import * as styles from '../../stylesContants';
import ExchangeRateIcon from '../Icons/ExchangeIcon';
import { printCurrency } from '../../utils/utils';
import { Currency } from '../../types';

interface Props {
  from: Currency;
  to: Currency;
  rate: number | null;
}

const exchangeRateCss = css({
  fontSize: styles.fontSizes.small,
  fontFamily: styles.fontFamily.main,
  color: styles.colors.blue,
  margin: styles.margin.normal,
});

const iconCss = {
  height: styles.fontSizes.small,
  fill: styles.colors.blue,
};

const FROM_PRECISION = 0;
const TO_PRECISION = 4;

const printFrom = printCurrency(FROM_PRECISION);
const printTo = printCurrency(TO_PRECISION);

const ExchangeRate = ({ from, to, rate }: Props) => (
  <div css={exchangeRateCss}>
    <ExchangeRateIcon {...iconCss} />
    {rate && ` ${printFrom(from)(1)} = ${printTo(to)(rate)}`}
    {!rate && 'loading'}
  </div>
);

export default ExchangeRate;
