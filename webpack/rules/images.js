module.exports = function (filesThreshold, isDevMode) {
  const filename = (ext) => (isDevMode ? `[name].${ext}` : `[name].[hash].${ext}`);
  return {
    module: {
      rules: [
        {
            test: /\.(ico|gif|png|jpg|jpeg|webp$)/,
            type: "asset/resource",
            generator: {
              filename: `images/${filename("[ext]")}`,
            },
          },
      ],
    },
  };
};
