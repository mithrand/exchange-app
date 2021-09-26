/* eslint-disable import/prefer-default-export */
import config from '../../config';
import { ExchangeRates } from '../../types';

const getUrl = () => `${config.exchangeAPIurl}/exchangeRates`;

export const getExchangeRates = async (): Promise<ExchangeRates> => {
  const url = getUrl();
  const response = await fetch(url);
  if (response.status >= 400) {
    throw new Error(
      `Failed to fetch exchange rates with url:${url} status:${response.status} - statusText:${response.statusText}`,
    );
  }
  return response.json();
};

