import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../store';
import {
  closeAccountList,
  setAccountFrom,
  setAccountTo,
} from '../../store/actions/accounts';

import { Account, AccountType } from '../../types';

import AccountList from './AccountList.ui';

const closeListDispatcher = (dispatch: ReturnType<typeof useDispatch>) => () =>
  dispatch(closeAccountList());

const onAccountClickDispatcher =
  (dispatch: ReturnType<typeof useDispatch>) =>
  (mode: string) =>
  (account: Account) => {
    if (mode === AccountType.from) {
      dispatch(setAccountFrom(account.id));
    }
    if (mode === AccountType.to) {
      dispatch(setAccountTo(account.id));
    }
    dispatch(closeAccountList());
  };

const accountSearchFilter =
  (searchString: string) =>
  ({ currency: { code, name, symbol = '' } }: Account) => {
    const lowerCasedSearchString = searchString.toLowerCase();
    return (
      !lowerCasedSearchString ||
      code.toLowerCase().includes(lowerCasedSearchString) ||
      name.toLowerCase().includes(lowerCasedSearchString) ||
      symbol.toLowerCase().includes(lowerCasedSearchString)
    );
  };

const AccountListContainer = () => {
  const isOpen = useSelector<Store, boolean>(
    (state) => state.accountsData.isAccountListOpen,
  );
  const accounts = useSelector<Store, Account[]>(
    (state) => state.accountsData.accounts,
  );

  const mode = useSelector<Store, AccountType | ''>(
    (state) => state.accountsData.accountListMode,
  );

  const [searchString, setSearchString] = useState('');
  const onSearchBoxChange = (newSearchString: string) =>
    setSearchString(newSearchString);
  const dispatch = useDispatch();
  const closeList = closeListDispatcher(dispatch);
  const accountClick = onAccountClickDispatcher(dispatch)(mode);

  if (!isOpen) {
    return null;
  }

  return (
    <AccountList
      accounts={accounts.filter(accountSearchFilter(searchString))}
      onCloseClick={closeList}
      onAccountClick={accountClick}
      onSearchBoxChange={onSearchBoxChange}
      searchString={searchString}
    />
  );
};

export default AccountListContainer;
