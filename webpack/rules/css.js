const path = require("path");
module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: path.join(__dirname, "src/components"),
          use: [
            "style-loader",
            {
              loader: "typings-for-css-modules-loader",
              options: {
                modules: true,
                namedExport: true,
              },
            },
          ],
        },
      ],
    },
  };
};
