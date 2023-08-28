const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyCssNames = require("mini-css-class-name/css-loader");
const path = require("path");
module.exports = function (isDevServer, isDevMode) {
  return {
    module: {
      rules: [
        {
          test: /\.css$|\.scss$/,
          use: [
            isDevServer
              ? "style-loader" //
              : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: /\.module\.\w+$/,
                  getLocalIdent: isDevMode
                    ? (loaderContext, _localIdentName, localName, options) => {
                        const request = path
                          .relative(
                            options.context || "",
                            loaderContext.resourcePath
                          )
                          .replace(`src${path.sep}`, "")
                          .replace(".module.css", "")
                          .replace(".module.scss", "")
                          .replace(/\\|\//g, "-")
                          .replace(/\./g, "_");
                        return `${request}__${localName}`;
                      }
                    : MinifyCssNames(
                        { excludePattern: /[_dD]/gi }
                      ),
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  includePaths: [path.resolve(__dirname, "src/styles")],
                },
              },
            },
            "postcss-loader",
          ],
        },
      ],
    },
  };
};
