import { useSelector } from 'react-redux';
import { calculateExchageRate } from '../utils';
import { Store } from './index';

export const useFromAccount = () =>
  useSelector(
    (state: Store) =>
      state.accountsData.accounts.find(
        (acc) => acc.id === state.accountsData.from,
      ) || state.accountsData.accounts[0],
  );

export const useToAccount = () =>
  useSelector(
    (state: Store) =>
      state.accountsData.accounts.find(
        (acc) => acc.id === state.accountsData.to,
      ) || state.accountsData.accounts[1],
  );

export const useAccountListMode = () =>
  useSelector((state: Store) => state.accountsData.accountListMode);

export const useExchangeMode = () =>
  useSelector((state: Store) => state.exchange.mode);

export const useExchangeRates = () =>
  useSelector((state: Store) => state.exchange.exchangeRates);

export const useQuantityFrom = () =>
  useSelector((state: Store) => state.exchange.quantityFrom);

export const useQuantityTo = () =>
  useSelector((state: Store) => state.exchange.quantityTo);

export const useAccountIsOpen = () =>
  useSelector((state: Store) => state.accountsData.isAccountListOpen);

export const useAccounts = () =>
  useSelector((state: Store) => state.accountsData.accounts);

export const useConfirmationMessageState = () =>
  useSelector((state: Store) => state.exchange.confirmationMessageOpen);

export const useExchangeRate = () => {
  const exchangeRates = useExchangeRates();
  const accountFrom = useFromAccount();
  const accoutTo = useToAccount();
  if (exchangeRates) {
    return calculateExchageRate(exchangeRates, accountFrom.currency, accoutTo.currency);
  }
  return null;
};
