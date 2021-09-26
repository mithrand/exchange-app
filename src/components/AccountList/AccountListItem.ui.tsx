/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';

import { Account } from '../../types';
import { onKeysPressHelper, printQuantity } from '../../utils';
import * as styles from '../../stylesContants';

interface Props {
  account: Account;
  onClick(account: Account): void;
}

const BALANCE_PRECISION = 2;
const printBalance = printQuantity(BALANCE_PRECISION);

const accountListItem = css({
  listStyleType: 'none',
  width: '100%',
  height: '2.25rem',
  position: 'relative',
  margin: '0.5rem 0rem',
  ':hover': {
    backgroundColor: '#b7b7b752',
  },
  padding: '5px',
});

const mainAccounDataCss = css({
  fontSize: styles.fontSizes.medium,
  fontFamily: styles.fontFamily.main,
  color: styles.colors.black,
  display: 'block',
});

const secondaryAccounDataCss = css({
  fontSize: styles.fontSizes.small,
  fontFamily: styles.fontFamily.main,
  color: styles.colors.grey,
  width: '100%',
  display: 'block',
  bottom: '0px',
  position: 'absolute',
});

const AccountListItem = ({ account, onClick }: Props) => (
  <li css={accountListItem} data-testid="account-list-item">
    <div
      role="button"
      onClick={() => onClick(account)}
      onKeyPress={onKeysPressHelper(() => onClick(account))}
      tabIndex={0}
    >
      <span css={mainAccounDataCss}>
        {account.currency.code} · {printBalance(account.balance)}
      </span>
      <span css={secondaryAccounDataCss}>{account.currency.name}</span>
    </div>
  </li>
);

export default AccountListItem;
