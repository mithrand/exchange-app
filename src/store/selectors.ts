import { useSelector } from 'react-redux';
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

export const useExchangeMode = () =>
  useSelector((state: Store) => state.exchange.mode);