/** @jsxRuntime classic /
/** @jsx jsx */

import React, { KeyboardEvent } from 'react';
import { css, jsx } from '@emotion/react';
import * as styles from '../../stylesContants';
import ArrowIcon from '../Icons/ArrowIcon';

import { Currency } from '../../types';

interface Props {
  currency: Currency;
  onClick(): void;
}

const currencyCss = css({
  fontFamily: styles.fontFamily.main,
  display: 'inline-block',
  width: '50%',
  cursor: 'pointer',
});

const iconCss = {
  height: styles.fontSizes.small,
  fill: styles.colors.black,
  strokeWidth: '1px',
  stroke: styles.colors.black,
  style: {
    transform: 'rotate(0.25turn)',
  },
};

// To mimic onClick when pressing enter over the div
const onKeysPress =
  (onClick: () => void) => (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

const CurrencyButton = ({ currency, onClick }: Props) => (
  <div
    data-testid="currency-button"
    role="button"
    css={currencyCss}
    onClick={onClick}
    onKeyPress={onKeysPress(onClick)}
    tabIndex={0}
  >
    {currency.code.toUpperCase()}
    {'   '}
    <ArrowIcon {...iconCss} />
  </div>
);

export default CurrencyButton;
