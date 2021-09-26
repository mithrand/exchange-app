/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { onKeysPressHelper } from '../../utils';
import * as styles from '../../stylesContants';

interface Props {
  children: string;
  onClick(): void;
}

const buttonCss = css({
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
  WebkitBoxAlign: 'center',
  WebkitBoxPack: 'center',
  fontFamily: styles.fontFamily.main,
  fontWeight: 300,
  fontSize: styles.fontSizes.medium,
  lineHeight: 1.41176,
  letterSpacing: '-0.025em',
  textAlign: 'center',
  height: '2.25rem',
  width: '100%',
  maxWidth: '480px',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  borderRadius: '10px',
  boxShadow:
    'rgb(6 102 235 / 12%) 0px 0.7rem 1.3rem 0px, rgb(6 102 235 / 24%) 0px 1rem 2.2rem 0px',
  backgroundColor: styles.colors.blue,
  color: 'white',
  transition: `background-color 300ms cubic-bezier(0.15, 0.5, 0.5, 1) 0s, 
     color 300ms cubic-bezier(0.15, 0.5, 0.5, 1) 0s, 
     opacity 300ms cubic-bezier(0.15, 0.5, 0.5, 1) 0s, 
     box-shadow 200ms cubic-bezier(0.4, 0.3, 0.8, 0.6) 0s
  `,
  cursor: 'pointer',
  display: 'flex',
  ':hover': {
    backgroundColor: styles.colors.blueHover,
    boxShadow: `rgb(6 102 235 / 9%) 0px 0.5rem 1rem 0px, 
      rgb(6 102 235 / 18%) 0px 0.9rem 2rem 0px`,
  },
  margin: styles.margin.normal,
});

const BaseButton = ({ children, onClick }: Props) => (
  <div
    role="button"
    css={buttonCss}
    onClick={onClick}
    onKeyPress={onKeysPressHelper(onClick)}
    tabIndex={0}
  >
    {children}
  </div>
);

export default BaseButton;
