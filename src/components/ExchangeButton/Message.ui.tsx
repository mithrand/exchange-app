/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import * as styles from '../../stylesContants';

interface Props {
  children: string;
}

const messageCss = css({
  fontFamily: styles.fontFamily.main,
  fontSize: styles.fontSizes.small,
  textAlign: 'right',
  color: styles.colors.red,
  width: '50%',
  display: 'inline-block',
});

const Message = ({ children }: Props) => <span data-testid="message" css={messageCss}>{children}</span>;

export default Message;
