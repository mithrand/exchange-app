import React from 'react';
import {
  useOpenModalDispatcher,
  useUpdateQuantityFromDispatcher,
  useUpdateQuantityToDispatcher,
} from '../../store/dispatchers';
import {
  useFromAccount,
  useQuantityFrom,
  useExchangeMode,
  useExchangeRate,
  useQuantityTo,
} from '../../store/selectors';
import { AccountType, ExchangeMode, Quantity } from '../../types';

import ExchangeButton from '../ExchangeButton';

const ExchangeFrom = () => {
  const openFromModal = useOpenModalDispatcher(AccountType.from);
  const account = useFromAccount();
  const quantityFrom = useQuantityFrom();
  const quantityTo = useQuantityTo();
  const mode = useExchangeMode();
  const exchangeRate = useExchangeRate();
  const updateFromQuantity = useUpdateQuantityFromDispatcher();
  const updateToQuantity = useUpdateQuantityToDispatcher();
  const onQuantityChange = (newQuantity: Quantity) => {
    if (mode === ExchangeMode.sell) {
      updateFromQuantity(newQuantity);
    }
    if (mode === ExchangeMode.buy) {
      updateToQuantity(newQuantity && exchangeRate ? newQuantity * exchangeRate : 0);
    }
  };
  const calculateQuantity = () => {
    if (mode === ExchangeMode.sell) {
      return quantityFrom;
    }
    return quantityTo && exchangeRate ? quantityTo / exchangeRate : 0;
  };
  return (
    <ExchangeButton
      account={account}
      onCurrencyButtonClick={openFromModal}
      quantity={calculateQuantity()}
      onQuantityChange={onQuantityChange}
      isNegative={mode === ExchangeMode.sell}
    />
  );
};

export default ExchangeFrom;
