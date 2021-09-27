import nock from 'nock';
import {
  changeExchangeMode,
  closeConfirmationMessage,
  openConfirmationMessage,
  resetQuantities,
  updateExchangeRates,
  updateQuantityFrom,
  updateQuantityTo,
} from './actions/exchange';
import {
  addToBalance,
  closeAccountList,
  openAccountList,
  removeFromBalance,
  setAccountFrom,
  setAccountTo,
} from './actions/accounts';
import accounts from '../data/accounts';
import { AccountType, ExchangeMode, ExchangeRates } from '../types';
import config from '../config';
import 'isomorphic-fetch';

const mockedExchangeRates: ExchangeRates = {
  EUR: 1,
  USD: 2,
  GBP: 3,
};

const mockDispatch = jest.fn();
const mockUseFromAccount = jest.fn();
const mockUseToAccount = jest.fn();
const mockUseQuantityFrom = jest.fn();
const mockUseQuantityTo = jest.fn();
const mockNotifyError = jest.fn();
const mockCalculateExchageRate = jest.fn();
const mockExchangeMode = jest.fn();
const mockUseExchangeRate = jest.fn();

const mockUseExchangeRates = jest
  .fn()
  .mockImplementation(() => mockedExchangeRates);
const mockUseAccountListMode = jest
  .fn()
  .mockImplementation(() => AccountType.from);

jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockImplementation(() => mockDispatch),
}));

jest.mock('../utils', () => ({
  calculateExchageRate: mockCalculateExchageRate,
  notifyError: mockNotifyError,
}));

jest.mock('./selectors', () => ({
  useFromAccount: mockUseFromAccount,
  useToAccount: mockUseToAccount,
  useQuantityFrom: mockUseQuantityFrom,
  useQuantityTo: mockUseQuantityTo,
  useExchangeRates: mockUseExchangeRates,
  useAccountListMode: mockUseAccountListMode,
  useExchangeMode: mockExchangeMode,
  useExchangeRate: mockUseExchangeRate,
}));

import {
  useChangeExchangeModeDispatcher,
  useCloseConfirmationMessageDispatcher,
  useCloseListDispatcher,
  useOpenModalDispatcher,
  useSelectAccountDispatcher,
  useSubmitExchangeDispatcher,
  useUpdateExchangeRatesDispatcher,
  useUpdateQuantityFromDispatcher,
  useUpdateQuantityToDispatcher,
} from './dispatchers';

describe('Dispatchers', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockUseFromAccount.mockClear().mockImplementation(() => accounts[0]);
    mockUseToAccount.mockClear().mockImplementation(() => accounts[1]);
    mockUseQuantityFrom.mockClear().mockImplementation(() => 100);
    mockUseQuantityTo.mockClear().mockImplementation(() => 300);
    mockNotifyError.mockClear();
    mockCalculateExchageRate.mockClear().mockImplementation(() => 3);
    mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.sell);
    mockUseExchangeRate.mockClear().mockImplementation(() => 0.5);
  });

  describe('useChangeExchangeModeDispatcher', () => {
    it('dispatch change exchange mode sell', () => {
      mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.sell);
      const dispatcher = useChangeExchangeModeDispatcher();
      dispatcher();
      expect(mockDispatch).toBeCalledWith(updateQuantityTo(50));
      expect(mockDispatch).toBeCalledWith(changeExchangeMode());
    });

    it('dispatch change exchange mode buy', () => {
      mockExchangeMode.mockClear().mockImplementation(() => ExchangeMode.buy);
      const dispatcher = useChangeExchangeModeDispatcher();
      dispatcher();
      expect(mockDispatch).toBeCalledWith(updateQuantityFrom(600));
      expect(mockDispatch).toBeCalledWith(changeExchangeMode());
    });
  });

  describe('useOpenModalDispatcher', () => {
    it('dispatch openAccount List', () => {
      const dispatcher = useOpenModalDispatcher(AccountType.from);
      dispatcher();
      expect(mockDispatch).toBeCalledWith(openAccountList(AccountType.from));
    });
  });

  describe('useUpdateExchangeRatesDispatcher', () => {
    describe('Green path', () => {
      beforeEach(() => {
        nock(config.exchangeAPIurl)
          .get('/exchangeRates')
          .reply(200, mockedExchangeRates);
      });

      it('Update exchange rates and quantity', async () => {
        const dispatcher = useUpdateExchangeRatesDispatcher();
        await dispatcher();
        expect(mockDispatch).toBeCalledWith(
          updateExchangeRates(mockedExchangeRates),
        );
      });
    });

    describe('red path', () => {
      beforeEach(() => {
        nock(config.exchangeAPIurl).get('/exchangeRates').reply(500);
      });

      it('Notify error on request failure', async () => {
        const dispatcher = useUpdateExchangeRatesDispatcher();
        await dispatcher();
        expect(mockDispatch).not.toBeCalled();
        expect(mockDispatch).not.toBeCalled();
        expect(mockNotifyError).toBeCalled();
      });
    });
  });

  describe('useUpdateQuantityFromDispatcher', () => {
    it('update "from" quantity from dispatcher', () => {
      const dispatcher = useUpdateQuantityFromDispatcher();
      dispatcher(100);
      expect(mockDispatch).toBeCalledWith(updateQuantityFrom(100));
      expect(mockDispatch).toBeCalledWith(updateQuantityTo(300));
    });
  });

  describe('useUpdateQuantityToDispatcher', () => {
    it('update "to" quantity from dispatcher', () => {
      const dispatcher = useUpdateQuantityToDispatcher();
      dispatcher(300);
      expect(mockDispatch).toBeCalledWith(updateQuantityFrom(100));
      expect(mockDispatch).toBeCalledWith(updateQuantityTo(300));
    });
  });

  describe('useSelectAccountDispatcher', () => {
    it('update from account', () => {
      mockUseAccountListMode
        .mockReset()
        .mockImplementation(() => AccountType.from);
      const dispatcher = useSelectAccountDispatcher();
      dispatcher(accounts[2]);
      expect(mockDispatch).toBeCalledWith(setAccountFrom(accounts[2].id));
      expect(mockDispatch).toBeCalledWith(resetQuantities());
      expect(mockDispatch).toBeCalledWith(closeAccountList());
    });

    it('update to account', () => {
      mockUseAccountListMode
        .mockReset()
        .mockImplementation(() => AccountType.to);
      const dispatcher = useSelectAccountDispatcher();
      dispatcher(accounts[2]);
      expect(mockDispatch).toBeCalledWith(setAccountTo(accounts[2].id));
      expect(mockDispatch).toBeCalledWith(resetQuantities());
      expect(mockDispatch).toBeCalledWith(closeAccountList());
    });
  });

  describe('useCloseListDispatcher', () => {
    it('Close account list modal', () => {
      const dispatcher = useCloseListDispatcher();
      dispatcher();
      expect(mockDispatch).toBeCalledWith(closeAccountList());
    });
  });

  describe('useSubmitExchangeDispatcher', () => {
    it('submit exchange in sell mode', () => {
      mockExchangeMode.mockReset().mockImplementation(() => ExchangeMode.sell);
      const dispatcher = useSubmitExchangeDispatcher();
      dispatcher();
      expect(mockDispatch).toBeCalledWith(addToBalance(accounts[1].id, 50));
      expect(mockDispatch).toBeCalledWith(removeFromBalance(accounts[0].id, 100));
      expect(mockDispatch).toBeCalledWith(openConfirmationMessage());
    });

    it('submit exchange in buy mode', () => {
      mockExchangeMode.mockReset().mockImplementation(() => ExchangeMode.buy);
      const dispatcher = useSubmitExchangeDispatcher();
      dispatcher();
      expect(mockDispatch).toBeCalledWith(addToBalance(accounts[0].id, 600));
      expect(mockDispatch).toBeCalledWith(removeFromBalance(accounts[1].id, 300));
      expect(mockDispatch).toBeCalledWith(openConfirmationMessage());
    });
  });

  describe('useCloseConfirmationMessageDispatcher', () => {
    it('Close confirmation message', () => {
      const dispatcher = useCloseConfirmationMessageDispatcher();
      dispatcher();
      expect(mockDispatch).toBeCalledWith(closeConfirmationMessage());
    });
  });
});
