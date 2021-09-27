/** @jsxRuntime classic /
/** @jsx jsx */

import React, { useState } from 'react';
import { css, jsx } from '@emotion/react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import * as styles from '../../stylesContants';
import { Quantity } from '../../types';

interface Props {
  quantity: Quantity;
  updateQuantity(quantity: Quantity): void;
  isNegative: boolean;
}

const numberFormatCss = (isEditing: boolean, quantity: Quantity) =>
  css({
    fontFamily: styles.fontFamily.main,
    fontSize: styles.fontSizes.medium,
    border: '0px',
    textAlign: 'right',
    fontWeight: 'bold',
    display: 'inline-block',
    width: '50%',
    padding: '0px',
    outline: 'none',
    caretColor: styles.colors.blue,
    color: isEditing || quantity ? styles.colors.black : styles.colors.grey,
    backgroundColor: 'transparent',
  });

const converValueToQuantity = (values: NumberFormatValues): Quantity => {
  if (typeof values.floatValue !== 'undefined') {
    return Math.abs(values.floatValue);
  }
  return null;
};

const calculatePrefix = (quantity: Quantity, isNegative: boolean) => {
  if (!quantity) {
    return '';
  }
  if (isNegative) {
    return '-';
  }
  return '+';
};

const QuantityInput = ({ quantity, updateQuantity, isNegative }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const onValueChangeHandler = (values: NumberFormatValues) => {
    if (isEditing) {
      const newQuantity = converValueToQuantity(values);
      updateQuantity(newQuantity);
    }
  };
  return (
    <NumberFormat
      data-testid="quantity-input"
      decimalScale={quantity || isEditing ? 2 : 0}
      decimalSeparator=","
      fixedDecimalScale
      displayType="input"
      type="text"
      prefix={calculatePrefix(quantity, isNegative)}
      allowNegative={false}
      allowLeadingZeros={false}
      css={numberFormatCss(isEditing, quantity)}
      thousandSeparator="."
      defaultValue={0}
      onValueChange={onValueChangeHandler}
      onFocus={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      {...(!isEditing ? { value: quantity } : {})}
    />
  );
};

export default QuantityInput;
