import React from 'react';
import {
  useOpenModalDispatcher,
  useUpdateQuantityToDispatcher,
} from '../../store/dispatchers';
import { useToAccount, useQuantityTo, useExchangeMode } from '../../store/selectors';
import { AccountType, ExchangeMode } from '../../types';

import ExchangeButton from '../ExchangeButton';

const ExchangeTo = () => {
  const openModal = useOpenModalDispatcher(AccountType.to);
  const account = useToAccount();
  const quantity = useQuantityTo();
  const exchangeMode = useExchangeMode();
  const onQuantityChange = useUpdateQuantityToDispatcher();
  return (
    <ExchangeButton
      account={account}
      onCurrencyButtonClick={openModal}
      quantity={quantity}
      onQuantityChange={onQuantityChange}
      isNegative={exchangeMode === ExchangeMode.buy}
    />
  );
};

export default ExchangeTo;
