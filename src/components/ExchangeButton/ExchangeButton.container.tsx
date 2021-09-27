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

export const ExchangeButtonContainer = ({
  quantity,
  ...props
}: Props) => {
  const [balanceExceeded, setBalanceExceded] = useState(false);
  const checkQuantity = (quantityToCheck: Quantity) => {
    if (quantityToCheck && props.isNegative && props.account.balance < quantityToCheck) {
      if (!balanceExceeded) {
        setBalanceExceded(true);
      }
    } else if (balanceExceeded) {
      setBalanceExceded(false);
    }
  };

  checkQuantity(quantity);
  return (
    <ExchangeButton
      {...props}
      quantity={quantity}
      alert={balanceExceeded}
      message={getMessages(balanceExceeded)}
    />
  );
};

export default ExchangeButtonContainer;
