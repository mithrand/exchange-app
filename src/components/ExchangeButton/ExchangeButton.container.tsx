import React, { useState } from 'react';
import { Quantity } from '../../types';

import ExchangeButton, {
  Props as ExchangeButtonProps,
} from './ExchangeButton.ui';

export interface Props
  extends Omit<ExchangeButtonProps, 'alert' | 'checkValue'> {}

const getMessages = (balanceExceeded: boolean): string => {
  const messages = [];
  if (balanceExceeded) {
    messages.push('Balance is exceeded');
  }
  return messages.join(',');
};

export const ExchangeButtonContainer = (props: Props) => {
  const [balanceExceeded, setBalanceExceded] = useState(false);
  const checkQuantity = () => (quantity: Quantity) => {
    if (quantity && props.isNegative && props.account.balance < quantity) {
      if (!balanceExceeded) {
        setBalanceExceded(true);
      }
    } else if (balanceExceeded) {
      setBalanceExceded(false);
    }
  };
  return (
    <ExchangeButton
      {...props}
      alert={balanceExceeded}
      checkValue={checkQuantity()}
      message={getMessages(balanceExceeded)}
    />
  );
};

export default ExchangeButtonContainer;
