import React from 'react';
import {
  useExchangeMode,
} from '../../store/selectors';
import {
  useChangeExchangeModeDispatcher,
} from '../../store/dispatchers';
import { ExchangeMode } from '../../types';

import BaseButton from './BaseButton';

const getExchangeMessage = (mode: ExchangeMode) =>
 mode === ExchangeMode.sell ? 'Sell ⇊' : 'Buy ⇈';

const SellBuyButton = () => {
  const exchangeMode = useExchangeMode();
  const changeExchangeMode = useChangeExchangeModeDispatcher();
  return (
    <BaseButton onClick={changeExchangeMode}>
      {getExchangeMessage(exchangeMode)}
    </BaseButton>
  );
};

export default SellBuyButton;
