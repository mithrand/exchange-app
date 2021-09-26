import React from 'react';
import {
  useFromAccount,
  useToAccount,
  useExchangeMode,
} from '../../store/selectors';
import { Account, ExchangeMode } from '../../types';

import BaseButton from './BaseButton';

const getConfirmMessage = (
  from: Account,
  to: Account,
  exchangeMode: ExchangeMode,
) =>
  exchangeMode === ExchangeMode.sell
    ? `Sell ${from.currency.code} for ${to.currency.code}`
    : `Buy ${to.currency.code} with ${from.currency.code}`;

const ConfirmButton = () => {
  const fromAccount = useFromAccount();
  const toAccount = useToAccount();
  const exchangeMode = useExchangeMode();

  const onButtonClick = () => {};
  return (
    <BaseButton onClick={onButtonClick}>
      {getConfirmMessage(fromAccount, toAccount, exchangeMode)}
    </BaseButton>
  );
};

export default ConfirmButton;
