module.exports = function (filesThreshold) {
  return {
    module: {
      rules: [
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
          type: "asset/inline",
        },
      ],
    },
  };
};
