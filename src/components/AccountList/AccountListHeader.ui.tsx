/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';

import * as styles from '../../stylesContants';
import ArrowIcon from '../Icons/ArrowIcon';
import { onKeysPressHelper } from '../../utils';

interface Props {
  onCloseClick(): void;
  onSearchBoxChange(searchString: string): void;
  searchString: string;
}

const accountHeaderCss = css({
    paddingBottom: '5px',
    borderBottom: `1px solid ${styles.colors.black}`,
});

const closeButtonCss = css({
  fontFamily: styles.fontFamily.main,
  display: 'inline-block',
  width: '30px',
  height: styles.fontSizes.medium,
});

const iconCss = {
  height: styles.fontSizes.medium,
  fill: styles.colors.black,
  strokeWidth: '1px',
  stroke: styles.colors.black,
  style: {
    top: '50%',
    transform: 'rotate(0.5turn)',
  },
};

const searchBarCss = css({
  fontFamily: styles.fontFamily.main,
  fontSize: styles.fontSizes.medium,
  display: 'inline-block',
  width: '50%',
  border: '0px',
  outline: 'none',
  height: styles.fontSizes.medium,
  backgroundColor: styles.backgroundColors.greyDark,
  padding: '0px',
  textDecoration: 'underline',
});

const clearButtonCss = css({
  fontFamily: styles.fontFamily.main,
  display: 'inline-block',
  width: '25px',
  height: styles.fontSizes.medium,
  position: 'absolute',
  right: '0px',
});

const AccountListHeader = ({
  searchString,
  onCloseClick,
  onSearchBoxChange,
}: Props) => (
  <div css={accountHeaderCss} data-testid="account-list-header">
    <div
      data-testid="close"
      css={closeButtonCss}
      role="button"
      onClick={onCloseClick}
      tabIndex={0}
      onKeyPress={onKeysPressHelper(onCloseClick)}
    >
      <ArrowIcon {...iconCss} />
    </div>
    <input
      data-testid="search"
      css={searchBarCss}
      type="text"
      value={searchString}
      onChange={(event) => onSearchBoxChange(event.currentTarget.value)}
    />
    {searchString && (
      <div
        data-testid="clear"
        css={clearButtonCss}
        role="button"
        onClick={() => onSearchBoxChange('')}
        onKeyPress={onKeysPressHelper(() => onSearchBoxChange(''))}
        tabIndex={0}
      >
        X
      </div>
    )}
  </div>
);

export default AccountListHeader;
