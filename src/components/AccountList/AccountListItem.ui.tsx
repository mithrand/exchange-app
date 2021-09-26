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
  height: '2.5rem',
  position: 'relative',
  margin: '0.5rem 0rem',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: styles.backgroundColors.white,
  boxShadow:
  'rgb(181 198 221 / 12%) 0px 0.7rem 1.3rem 0px, rgb(234 234 235 / 24%) 0px 1rem 2.2rem 0px',
  ':hover': {
    backgroundColor: '#b7b7b752',
    boxShadow: 'rgb(54 56 58 / 12%) 0px 0.7rem 1.3rem 0px, rgb(69 69 70 / 26%) 0px 1rem 2.2rem 0px',
  },

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
  bottom: '10px',
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
