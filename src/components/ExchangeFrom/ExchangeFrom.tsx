import React from 'react';
import {
  useOpenModalDispatcher,
  useUpdateQuantityFromDispatcher,
} from '../../store/dispatchers';
import {
  useFromAccount,
  useQuantityFrom,
  useExchangeMode,
} from '../../store/selectors';
import { AccountType, ExchangeMode } from '../../types';

import ExchangeButton from '../ExchangeButton';

const ExchangeFrom = () => {
  const openFromModal = useOpenModalDispatcher(AccountType.from);
  const account = useFromAccount();
  const quantity = useQuantityFrom();
  const exchangeMode = useExchangeMode();
  const onQuantityChange = useUpdateQuantityFromDispatcher();
  return (
    <ExchangeButton
      account={account}
      onCurrencyButtonClick={openFromModal}
      quantity={quantity}
      onQuantityChange={onQuantityChange}
      isNegative={exchangeMode === ExchangeMode.sell}
    />
  );
};

export default ExchangeFrom;
