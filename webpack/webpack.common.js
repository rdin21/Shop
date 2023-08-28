const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { default: merge } = require("webpack-merge");
const scss = require("./rules/scss");
const tsTsx = require("./rules/ts-tsx");
const jsJsx = require("./rules/js-jsx");
const images = require("./rules/images");
const fonts = require("./rules/fonts");
const css = require("./rules/css");
const plugins = require("./plugins/plugins");
const optimization = require("./settings/optimization");
const stats = require("./settings/stats");
const stylelint = require("./rules/sass.lint");

const PATHS = {
  src : path.resolve(__dirname, "../src/"),
  build : path.resolve(__dirname, "../build/"),
  assetsPath : path.resolve(__dirname, "../public/"),
};
const filesThreshold = 8196;

/* eslint-disable func-names */
module.exports = function (env, argv) {
  const isDevServer = env.WEBPACK_SERVE;
  const mode = argv.mode || (isDevServer ? "development" : "production");
  const isDevMode = mode !== "production";
  process.env.NODE_ENV = mode;

  /** @type {import('webpack').Configuration} */
  const result = {
    stats: stats(),
    entry: path.resolve(PATHS.src, "index.tsx"),
    output: {
      path: PATHS.build,
      filename: "[name].js",
      chunkFilename: "[name].js",
      publicPath: "/",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, "../tsconfig.json")   })],
    },
    optimization: optimization(),
  };

  const rules = [
    scss(isDevServer, isDevMode, path),
    tsTsx(),
    jsJsx(),
    images(filesThreshold, isDevMode),
    fonts(),
    css(),
    stylelint()
  ];
  const allPlugins = plugins(isDevMode, mode, PATHS.src, PATHS.assetsPath, PATHS.build);
  return merge([result, allPlugins, ...rules]);
};

module.exports.filesThreshold = filesThreshold;
module.exports.assetsPath = PATHS.assetsPath;
