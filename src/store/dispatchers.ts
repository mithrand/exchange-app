import { useDispatch } from 'react-redux';

import {
  changeExchangeMode,
  updateExchangeRates,
  updateQuantityFrom,
  updateQuantityTo,
  resetQuantities,
} from './actions/exchange';

import {
  useExchangeRates,
  useToAccount,
  useFromAccount,
  useAccountListMode,
} from './selectors';

import {
  openAccountList,
  setAccountFrom,
  setAccountTo,
  closeAccountList,
} from './actions/accounts';

import { calculateExchageRate } from '../utils';

import {
  AccountType,
  ExchangeRates,
  Quantity,
  Account,
} from '../types';

export const useChangeExchangeModeDispatcher = () => {
  const dispatch = useDispatch();
  return () => dispatch(changeExchangeMode());
};

export const useOpenModalDispatcher = (accountType: AccountType) => {
  const dispatch = useDispatch();
  return () => dispatch(openAccountList(accountType));
};

export const useUpdateExchangeRatesDispatcher = () => {
  const dispatch = useDispatch();
  return (exchangeRates: ExchangeRates) =>
    dispatch(updateExchangeRates(exchangeRates));
};

export const useUpdateQuantityFromDispatcher = () => {
  const dispatch = useDispatch();
  const exchangeRates = useExchangeRates();
  const fromAccount = useFromAccount();
  const toAccount = useToAccount();
  return (quantity: Quantity) => {
    if (exchangeRates) {
      const exchangeRate = calculateExchageRate(
        exchangeRates,
        fromAccount.currency,
        toAccount.currency,
      );
      dispatch(updateQuantityFrom(quantity));
      dispatch(updateQuantityTo(quantity ? quantity * exchangeRate : 0));
    }
  };
};

export const useUpdateQuantityToDispatcher = () => {
  const dispatch = useDispatch();
  const exchangeRates = useExchangeRates();
  const fromAccount = useFromAccount();
  const toAccount = useToAccount();
  return (quantity: Quantity) => {
    if (exchangeRates) {
      const exchangeRate = calculateExchageRate(
        exchangeRates,
        fromAccount.currency,
        toAccount.currency,
      );
      dispatch(updateQuantityFrom(quantity ? quantity * exchangeRate : 0));
      dispatch(updateQuantityTo(quantity));
    }
  };
};

export const useSelectAccountDispatcher = () => {
  const dispatch = useDispatch();
  const mode = useAccountListMode();

  return (account: Account) => {
    if (mode === AccountType.from) {
      dispatch(setAccountFrom(account.id));
    }
    if (mode === AccountType.to) {
      dispatch(setAccountTo(account.id));
    }
    dispatch(resetQuantities());
    dispatch(closeAccountList());
  };
};

export const useCloseListDispatcher = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(closeAccountList());
  };
};
