import { useEffect } from 'react';
import config from '../../config';
import { useUpdateExchangeRatesDispatcher } from '../../store/dispatchers';

interface Props {}

const ExchangeRatesProvider = ({}: Props) => {
  const updateExchangeRates = useUpdateExchangeRatesDispatcher();
  updateExchangeRates();
  useEffect(() => {
    const intervalId = setInterval(
      updateExchangeRates,
      config.exchangeRatePullingInverval,
    );
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [updateExchangeRates]);
  return null;
};

export default ExchangeRatesProvider;
