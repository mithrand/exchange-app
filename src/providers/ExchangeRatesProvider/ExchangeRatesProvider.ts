import { useEffect, useState } from 'react';
import config from '../../config';
import { useUpdateExchangeRatesDispatcher } from '../../store/dispatchers';
import { ExchangeRates } from '../../types';
import { getExchangeRates } from './api';
import { notifyError } from '../../utils';

interface Props {}
type UpdateExchangeRatesDispatcher = (exchange: ExchangeRates) => void;

const refreshExchangeRates =
  (updateExchangeRates: UpdateExchangeRatesDispatcher) => async () => {
    try {
      const exchangeRates = await getExchangeRates();
      updateExchangeRates(exchangeRates);
    } catch (error: any) {
      notifyError(error);
    }
  };

const ExchangeRatesProvider = ({}: Props) => {
  const updateExchangeRates = useUpdateExchangeRatesDispatcher();
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  useEffect(() => {
    if (intervalId) {
      return;
    }
    const updater = refreshExchangeRates(updateExchangeRates);
    const newIntervalId = setInterval(
      updater,
      config.exchangeRatePullingInverval,
    );
    setIntervalId(newIntervalId);
    updater();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [updateExchangeRates, intervalId, setIntervalId]);
  return null;
};

export default ExchangeRatesProvider;
