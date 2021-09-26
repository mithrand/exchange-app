/** @jsxRuntime classic /
/** @jsx jsx */

import { css, jsx } from '@emotion/react';

import Modal from 'react-modal';
import React from 'react';
import * as styles from '../../stylesContants';
import { printCurrency, onKeysPressHelper } from '../../utils';
import { Currency } from '../../types';

export interface Props {
  closeModal(): void;
  currencyFrom: Currency;
  quantityFrom: number;
  currencyTo: Currency;
  quantityTo: number;
}

const confirmationMessageCss = css({
  width: '200px',
  height: '200px',
  padding: '0px',
  margin: '0px',
  backgroundColor: styles.colors.white,
  borderRadius: '15px',
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow:
    'rgb(181 198 221 / 12%) 0px 0.7rem 1.3rem 0px, rgb(234 234 235 / 24%) 0px 1rem 2.2rem 0px',
});

const messageOneCss = css({
  fontSize: styles.fontSizes.medium,
  color: styles.colors.black,
  fontFamily: styles.fontFamily.main,
});

const messageTwoCss = css({
  fontFamily: styles.fontFamily.main,
  fontSize: styles.fontSizes.medium,
  color: styles.colors.blue,
});

const formatCurrency = printCurrency(2);

const ConfirmationMessage = ({
  closeModal,
  currencyFrom,
  quantityFrom,
  currencyTo,
  quantityTo,
}: Props) => (
  <Modal
    isOpen
    contentLabel="confirmation message"
    onRequestClose={closeModal}
    appElement={document.body}
    style={{
      content: {
        inset: '0px',
        display: 'flex',
        maxWidth: '500px',
        backgroundColor: 'rgb(255 255 255 / 0%)',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      },
    }}
  >
    <div
      role="button"
      css={confirmationMessageCss}
      onClick={closeModal}
      onKeyPress={onKeysPressHelper(closeModal)}
      tabIndex={0}
    >
      <span css={messageOneCss}>You exchanged</span>
      <span css={messageTwoCss}>
        {formatCurrency(currencyFrom)(quantityFrom)} to $
        {formatCurrency(currencyTo)(quantityTo)}
      </span>
    </div>
  </Modal>
);

export default ConfirmationMessage;
