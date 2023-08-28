const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ObsoleteWebpackPlugin = require("obsolete-webpack-plugin");
const path = require("path");

module.exports = function (isDevMode, mode,srcPath, assetsPath, destPath) {
  return {
    plugins: [
      new webpack.WatchIgnorePlugin({ paths: [/\.d\.ts$/] }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(mode),
          BASE_URL: "\"/\"",
        },
        "global.DEV": JSON.stringify(isDevMode),
        "global.DEBUG": JSON.stringify(false),
        "global.VERBOSE": JSON.stringify(false),
      }),
      // new CaseSensitivePathsPlugin(), // it fixes bugs between OS in caseSensitivePaths (since Windows isn't CaseSensitive but Linux is)
      // new FriendlyErrorsWebpackPlugin(), // it provides user-friendly errors from webpack (since the last has ugly useless bug-report)
      new HtmlWebpackPlugin({
        template: path.resolve(srcPath, "index.html"),
        minify: isDevMode
          ? false
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true,
              collapseBooleanAttributes: true,
              removeScriptTypeAttributes: true,
            },
      }),
      new MiniCssExtractPlugin({
        filename: isDevMode ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: isDevMode ? "[id].css" : "[id].[contenthash].css",
      }),
      new CleanPlugin.CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: assetsPath,
            to: destPath,
            toType: "dir",
            noErrorOnMissing:true
          },
        ],
      }),
      new webpack.ProgressPlugin(),
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new ObsoleteWebpackPlugin({
        name: "obsolete",
        promptOnNonTargetBrowser: true,
      }),
    ],
  };
};
