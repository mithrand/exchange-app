/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';

import * as styles from '../../stylesContants';

interface Props {
  children: string;
}

const titleCss = css({
  fontSize: styles.fontSizes.big,
  fontFamily: styles.fontFamily.main,
  color: styles.colors.black,
  margin: styles.margin.normal,
});

const Title = ({ children }: Props) => <h1 css={titleCss}>{children}</h1>;

export default Title;
