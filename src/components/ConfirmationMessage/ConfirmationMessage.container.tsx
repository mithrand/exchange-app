import React, { useEffect } from 'react';
import { useCloseConfirmationMessageDispatcher } from '../../store/dispatchers';
import {
  useConfirmationMessageState,
  useExchangeMode,
  useFromAccount,
  useQuantityFrom,
  useQuantityTo,
  useToAccount,
} from '../../store/selectors';
import { ExchangeMode } from '../../types';
import ConfirmationMessage, {
  Props as ConfirmationMessageProps,
} from './ConfirmationMessage.ui';

interface Props {}

const CLOSE_MODAL_TIMEOUT = 2 * 1000; // 10seg

const ConfirmationMessageContainer = ({}: Props) => {
  const fromAccount = useFromAccount();
  const toAccount = useToAccount();
  const exchangeMode = useExchangeMode();
  const toQuantity = useQuantityTo();
  const fromQuantity = useQuantityFrom();
  const isOpen = useConfirmationMessageState();
  const closeModal = useCloseConfirmationMessageDispatcher();

  useEffect(() => {
    let timeOut:NodeJS.Timeout | null = null;
    if (isOpen) {
      timeOut = setTimeout(closeModal, CLOSE_MODAL_TIMEOUT);
    }
    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [closeModal, isOpen]);

  if (!isOpen) {
    return null;
  }

  let props: ConfirmationMessageProps;

  if (exchangeMode === ExchangeMode.sell) {
    props = {
      currencyFrom: fromAccount.currency,
      quantityFrom: fromQuantity || 0,
      currencyTo: toAccount.currency,
      quantityTo: toQuantity || 0,
      closeModal,
    };
  } else {
    props = {
      currencyFrom: toAccount.currency,
      quantityFrom: toQuantity || 0,
      currencyTo: fromAccount.currency,
      quantityTo: fromQuantity || 0,
      closeModal,
    };
  }

  return <ConfirmationMessage {...props} />;
};

export default ConfirmationMessageContainer;
