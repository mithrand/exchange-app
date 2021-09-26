/** @jsxRuntime classic /
/** @jsx jsx */

import { css, jsx } from '@emotion/react';

import Modal from 'react-modal';
import React from 'react';
import { Account } from '../../types';
import AccountListHeader from './AccountListHeader.ui';
import AccountListItem from './AccountListItem.ui';
import * as styles from '../../stylesContants';

interface Props {
  accounts: Account[];
  onCloseClick(): void;
  onAccountClick(account: Account): void;
  onSearchBoxChange(searchString: string): void;
  searchString: string;
}

const listContentCss = css({
  width: '100%',
  padding: '0px',
  margin: '0px',
});

const AccountList = ({
  searchString,
  accounts,
  onCloseClick,
  onAccountClick,
  onSearchBoxChange,
}: Props) => (
  <Modal
    isOpen
    contentLabel="Select account"
    onRequestClose={onCloseClick}
    appElement={document.body}
    style={{
      content: {
        backgroundColor: styles.backgroundColors.greyDark,
        inset: '0px',
      },
    }}
  >
    <div data-testid="account-list">
      <AccountListHeader
        searchString={searchString}
        onCloseClick={onCloseClick}
        onSearchBoxChange={onSearchBoxChange}
      />
      <ul css={listContentCss} data-testid="account-list-content">
        {accounts.map((account) => (
          <AccountListItem
            key={account.id}
            account={account}
            onClick={onAccountClick}
          />
        ))}
      </ul>
    </div>
  </Modal>
);

export default AccountList;
