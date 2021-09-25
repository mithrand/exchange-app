export interface Currency {
  symbol?: string,
  code: string,
  name: string,
}

export interface CurrencyAccount {
  currency: Currency,
  balance: number,
}

