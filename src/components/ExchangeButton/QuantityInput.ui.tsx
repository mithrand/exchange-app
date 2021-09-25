/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import * as styles from '../../stylesContants';
import { printQuantity } from '../../utils';

interface Props {
  quantity?: number;
}

const CUANTITY_PRECISION = 2;
const printQuantityValue = printQuantity(CUANTITY_PRECISION);

const quantityInputCss = css({
  fontFamily: styles.fontFamily.main,
  fontSize: styles.fontSizes.medium,
  border: '0px',
  textAlign: 'right',
  fontWeight: 'bold',
  display: 'inline-block',
  width: '50%',
  padding: '0px',
});

const QuantityInput = ({ quantity }: Props) => (
  <input
    data-testid="quantity-input"
    type="text"
    css={quantityInputCss}
    value={quantity ? printQuantityValue(quantity) : ''}
    placeholder="0"
  />
);

export default QuantityInput;
