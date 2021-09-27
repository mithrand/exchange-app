import { useDispatch } from 'react-redux';

import {
  changeExchangeMode,
  updateExchangeRates,
  updateQuantityFrom,
  updateQuantityTo,
  resetQuantities,
  closeConfirmationMessage,
  openConfirmationMessage,
} from './actions/exchange';

import {
  useExchangeRates,
  useToAccount,
  useFromAccount,
  useAccountListMode,
  useExchangeMode,
  useQuantityFrom,
  useQuantityTo,
  useExchangeRate,
} from './selectors';

import {
  openAccountList,
  setAccountFrom,
  setAccountTo,
  closeAccountList,
  removeFromBalance,
  addToBalance,
} from './actions/accounts';

import { calculateExchageRate, notifyError } from '../utils';

import {
 AccountType, Quantity, Account, ExchangeMode,
} from '../types';
import { getExchangeRates } from '../API/getExchangeRates';

export const useChangeExchangeModeDispatcher = () => {
  const dispatch = useDispatch();
  const exchangeRate = useExchangeRate();
  const exchangeMode = useExchangeMode();
  const quantityFrom = useQuantityFrom();
  const quantityTo = useQuantityTo();
  return () => {
    if (exchangeMode === ExchangeMode.sell) {
      const newQuantity =
        quantityFrom && exchangeRate ? quantityFrom * exchangeRate : 0;
      dispatch(updateQuantityTo(newQuantity));
    } else {
      const newQuantity =
        quantityTo && exchangeRate ? quantityTo / exchangeRate : 0;
      dispatch(updateQuantityFrom(newQuantity));
    }
    dispatch(changeExchangeMode());
  };
};

export const useOpenModalDispatcher = (accountType: AccountType) => {
  const dispatch = useDispatch();
  return () => dispatch(openAccountList(accountType));
};

export const useUpdateExchangeRatesDispatcher = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      const exchangeRates = await getExchangeRates();
      dispatch(updateExchangeRates(exchangeRates));
    } catch (error: any) {
      notifyError(error);
    }
  };
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
      dispatch(updateQuantityFrom(quantity ? quantity / exchangeRate : 0));
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

export const useSubmitExchangeDispatcher = () => {
  const dispatch = useDispatch();
  const exchageRate = useExchangeRate();
  const fromAccount = useFromAccount();
  const fromQuantity = useQuantityFrom();
  const toAccount = useToAccount();
  const toQuantity = useQuantityTo();
  const exchangeMode = useExchangeMode();
  return () => {
    if (exchageRate && fromQuantity && toQuantity) {
      if (exchangeMode === ExchangeMode.sell) {
        dispatch(addToBalance(toAccount.id, fromQuantity * exchageRate));
        dispatch(removeFromBalance(fromAccount.id, fromQuantity));
      }
      if (exchangeMode === ExchangeMode.buy) {
        dispatch(addToBalance(fromAccount.id, toQuantity / exchageRate));
        dispatch(removeFromBalance(toAccount.id, toQuantity));
      }
      dispatch(openConfirmationMessage());
    }
  };
};

export const useCloseConfirmationMessageDispatcher = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(resetQuantities());
    dispatch(closeConfirmationMessage());
  };
};
