const randomNumber = (min, max) => Math.random() * (max - min) + min;

const generateExchangeRates = () => ({
  EUR: 1,
  USD: 1.1716 + randomNumber(1.0, 0.5),
  GBP: 0.8563 + randomNumber(1.0, 0.5),
});

module.exports = { generateExchangeRates };
