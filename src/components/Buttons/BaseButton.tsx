/** @jsxRuntime classic /
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import * as styles from '../../stylesContants';

interface Props {
  children: string;
  onClick(): void;
  disabled?: boolean;
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
  border: '0px',
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
  margin: styles.margin.normal,
  ':hover': {
    backgroundColor: styles.colors.blueHover,
    boxShadow: `rgb(6 102 235 / 9%) 0px 0.5rem 1rem 0px, 
      rgb(6 102 235 / 18%) 0px 0.9rem 2rem 0px`,
  },
  ':disabled': {
    backgroundColor: styles.colors.grey,
    boxShadow: 'none',
    cursor: 'inherit',
  },
});

const BaseButton = ({ children, onClick, disabled = false }: Props) => (
  <button type="button" css={buttonCss} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default BaseButton;
