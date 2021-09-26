import { useDispatch } from 'react-redux';
import { changeExchangeMode, updateExchangeRates } from './actions/exchange';
import { openAccountList } from './actions/accounts';
import { AccountType, ExchangeRates } from '../types';

export const useChangeExchangeModeDispatcher = () => {
  const dispath = useDispatch();
  return () => dispath(changeExchangeMode());
};

export const useOpenModalDispatcher = (accountType: AccountType) => {
  const dispath = useDispatch();
  return () => dispath(openAccountList(accountType));
};

export const useUpdateExchangeRatesDispatcher = () => {
  const dispath = useDispatch();
  return (exchangeRates: ExchangeRates) => dispath(updateExchangeRates(exchangeRates));
};
