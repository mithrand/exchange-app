/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import * as styles from '../../stylesContants';
import ExchangeRateIcon from '../Icons/ExchangeIcon';
import { getCurrencyShort } from '../../utils/utils';
import { Currency } from '../../types';


interface Props {
  from: Currency;
  to: Currency;
  rate: number;
}

const RATE_PRECISION = 4;

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


const ExchangeRate = ({ from, to, rate }: Props) => (
  <div css={exchangeRateCss}>
    <ExchangeRateIcon {...iconCss} />
    {`1 ${getCurrencyShort(from)} = ${rate.toFixed(RATE_PRECISION).toString()} ${getCurrencyShort(to)}`}
  </div>
);

export default ExchangeRate;
