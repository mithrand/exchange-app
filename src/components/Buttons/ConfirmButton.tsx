import React from 'react';
import {
  useFromAccount,
  useToAccount,
  useExchangeMode,
  useQuantityFrom,
  useQuantityTo,
  useExchangeRates,
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
  const quantityFrom = useQuantityFrom();
  const quantityTo = useQuantityTo();
  const exchangeRates = useExchangeRates();

  const shouldBeDisabled = ():boolean => {
    if (!exchangeRates) {
      return true;
    }

    if (exchangeMode === ExchangeMode.sell) {
      return Boolean(!quantityFrom || fromAccount.balance < quantityFrom);
    }

    if (exchangeMode === ExchangeMode.buy) {
      return Boolean(!quantityTo || toAccount.balance < quantityTo);
    }
    return true;
  };

  const onButtonClick = () => {};
  return (
    <BaseButton onClick={onButtonClick} disabled={shouldBeDisabled()}>
      {getConfirmMessage(fromAccount, toAccount, exchangeMode)}
    </BaseButton>
  );
};

export default ConfirmButton;
