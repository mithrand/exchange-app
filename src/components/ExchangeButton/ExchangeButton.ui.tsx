/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import * as styles from '../../stylesContants';

interface Props {}

const exchangeButtonCss = css({
  fontFamily: styles.fontFamily.main,
});

const ExchangeButton = ({}: Props) => (
  <div css={exchangeButtonCss}>ExchangeButton</div>
);

export default ExchangeButton;
