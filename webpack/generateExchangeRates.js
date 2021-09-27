const randomNumber = (min, max) => Math.random() * (max - min) + min;

const generateExchangeRates = () => ({
  EUR: 1,
  USD: 1.1716 + randomNumber(0.02, 0.01),
  GBP: 0.8563 + randomNumber(0.02, 0.01),
});

module.exports = { generateExchangeRates };
