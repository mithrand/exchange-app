import { useDispatch } from 'react-redux';
import { changeExchangeMode } from './actions/exchange';
import { openAccountList } from './actions/accounts';
import { AccountType } from '../types';

export const useChangeExchangeModeDispatcher = () => {
  const dispath = useDispatch();
  return () => dispath(changeExchangeMode());
};

export const useOpenModalDispatcher = (accountType: AccountType) => {
  const dispath = useDispatch();
  return () => dispath(openAccountList(accountType));
};
