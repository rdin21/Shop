/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require("webpack-merge");
const CleanPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dev = require("./webpack.dev");

module.exports = (env, argv) => {
  const devConfig = dev(env, argv);
  function remove(searchFunction) {
    devConfig.plugins.splice(devConfig.plugins.findIndex(searchFunction), 1);
  }
  remove((a) => a instanceof CleanPlugin.CleanWebpackPlugin);
  remove((a) => a instanceof CopyWebpackPlugin);
  remove((a) => a instanceof MiniCssExtractPlugin);

  /** @type {import('webpack').Configuration} */
  const extendedConfig = {
    target: "web",
    devServer: {
      hot: true,
      port: 3002,
      open: true,
      historyApiFallback: {
        rewrites: [
          { from: /favicon.ico/, to: "public/favicon.ico" },
        ],
      },
    },
  };

  return merge(devConfig, extendedConfig);
};
