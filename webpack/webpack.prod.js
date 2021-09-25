const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');
const packageJson = require('../package.json');


module.exports = () => (
  merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: `[name].${packageJson.version}.[contenthash].bundle.js`,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new StatsWriterPlugin({
        filename: 'stats.json',
      }),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
        reportFilename: path.resolve(
          process.cwd(),
          'bundle-analyzer-report.html',
        ),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html',
      }),
    ],
  })
);
