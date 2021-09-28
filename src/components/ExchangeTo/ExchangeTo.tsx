import React from 'react';
import {
  useOpenModalDispatcher,
  useUpdateQuantityFromDispatcher,
  useUpdateQuantityToDispatcher,
} from '../../store/dispatchers';
import {
  useQuantityFrom,
  useExchangeMode,
  useExchangeRate,
  useToAccount,
  useQuantityTo,
} from '../../store/selectors';
import { AccountType, ExchangeMode, Quantity } from '../../types';

import ExchangeButton from '../ExchangeButton';

const ExchangeTo = () => {
  const openFromModal = useOpenModalDispatcher(AccountType.to);
  const account = useToAccount();
  const quantityFrom = useQuantityFrom();
  const quantityTo = useQuantityTo();
  const mode = useExchangeMode();
  const exchangeRate = useExchangeRate();
  const updateFromQuantity = useUpdateQuantityFromDispatcher();
  const updateToQuantity = useUpdateQuantityToDispatcher();
  const onQuantityChange = (newQuantity: Quantity) => {
    if (mode === ExchangeMode.sell) {
      updateFromQuantity(newQuantity && exchangeRate ? newQuantity / exchangeRate : 0);
    }
    if (mode === ExchangeMode.buy) {
      updateToQuantity(newQuantity);
    }
  };
  const calculateQuantity = () => {
    if (mode === ExchangeMode.sell) {
      return quantityFrom && exchangeRate ? quantityFrom * exchangeRate : 0;
    }
    return quantityTo;
  };
  return (
    <ExchangeButton
      account={account}
      onAccountButtonClick={openFromModal}
      quantity={calculateQuantity()}
      onQuantityChange={onQuantityChange}
      isNegative={mode === ExchangeMode.buy}
    />
  );
};

export default ExchangeTo;
