import React from 'react';
import Title from './Title.ui';
import { useExchangeMode, useFromAccount } from '../../store/selectors';
import { Account, ExchangeMode } from '../../types';

interface Props {}

const getTitleMessage = (exchangeMode: ExchangeMode, accountFrom: Account) =>
  exchangeMode === ExchangeMode.sell
    ? `Sell ${accountFrom.currency.code}`
    : `Buy ${accountFrom.currency.code}`;

const TitleContainer = ({}: Props) => {
  const exchangeMode = useExchangeMode();
  const accountFrom = useFromAccount();
  return <Title>{getTitleMessage(exchangeMode, accountFrom)}</Title>;
};

export default TitleContainer;
