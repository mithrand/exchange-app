/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import * as styles from '../../stylesContants';

interface Props {
  children: string;
  alert: boolean,
}

const messageCss = (alert: boolean) => css({
  fontFamily: styles.fontFamily.main,
  fontSize: styles.fontSizes.small,
  textAlign: 'right',
  color: alert ? styles.colors.red : styles.colors.grey,
  width: '50%',
  display: 'inline-block',
});

const Message = ({ children, alert }: Props) => <span data-testid="message" css={messageCss(alert)}>{children}</span>;

export default Message;
