/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const common = require("./webpack.common");

module.exports = (env, argv) => {
  const commonConfig = common(env, argv);

  /** @type {import('webpack').Configuration} */
  const extendedConfig = {
    mode: "production",
    devtool: argv.sourceMap != null ? "source-map" : false,
    output: {
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[name].[contenthash:8].js",
    },
    performance: {
      assetFilter: function assetFilter(assetFilename) {
        return !/(\.map$)|(fonts)|(images)/.test(assetFilename);
      },
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          test: /\.m?js(\?.*)?$/i,
          extractComments: false,
          terserOptions: {
            toplevel: true,
            output: {
              comments: false,
            },
            mangle: {
              safari10: true,
            },
            compress: { pure_funcs: ["console.info", "console.debug", "console.warn"] },
          },
        }),
        new CssMinimizerWebpackPlugin({}),
      ],
    },
    plugins: [
      new CompressionPlugin({
        threshold: common.filesThreshold,
      }),
    ],
  };
  return merge(commonConfig, extendedConfig);
};
