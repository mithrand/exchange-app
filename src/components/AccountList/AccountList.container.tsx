import React, { useState } from 'react';

import { useSelectAccountDispatcher, useCloseListDispatcher } from '../../store/dispatchers';
import { useAccountListStatus, useAccounts } from '../../store/selectors';

import { Account } from '../../types';

import AccountList from './AccountList.ui';

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
  const [searchString, setSearchString] = useState('');
  const accounts = useAccounts();
  const isOpen = useAccountListStatus();
  const closeList = useCloseListDispatcher();
  const selectAccount = useSelectAccountDispatcher();

  if (!isOpen) {
    return null;
  }

  return (
    <AccountList
      accounts={accounts.filter(accountSearchFilter(searchString))}
      onCloseClick={closeList}
      onAccountClick={selectAccount}
      onSearchBoxChange={(newSearchString: string) => setSearchString(newSearchString)}
      searchString={searchString}
    />
  );
};

export default AccountListContainer;
