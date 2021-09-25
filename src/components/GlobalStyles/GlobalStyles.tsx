/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx, Global } from '@emotion/react';
import * as styles from '../../stylesContants';

const GlobalStyles = () => (
  <Global
    styles={css`
      body,
      html,
      #root {
        height: 100%;
        padding: 0 !important;
        background-color: ${styles.backgroundColors.greyDark}
      }
    `}
  />
);

export default GlobalStyles;
