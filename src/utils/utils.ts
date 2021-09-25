/* eslint-disable import/prefer-default-export */
import { Currency } from '../types';

export const getCurrencyShort = (currency: Currency) => currency.symbol || currency.code;
