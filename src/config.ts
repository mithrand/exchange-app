export interface Config {
  baseCurrency: string;
  exchangeRatePullingInverval: number;
  exchangeAPIurl: string;
}

const config: Config = {
  baseCurrency: 'EUR',
  exchangeRatePullingInverval: 60 * 10 * 1000, // 10 seconds in ms
  exchangeAPIurl: 'http://localhost:80',
};

export default config;
