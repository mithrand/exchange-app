const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const { generateExchangeRates } = require('./generateExchangeRates');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 80,
    onBeforeSetupMiddleware: (devServer) => {
      devServer.app.get('/exchangeRates', (req, res) => {
        // delay to show loading status
        setTimeout(() => res.json(generateExchangeRates()), 200);
      });
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
});
