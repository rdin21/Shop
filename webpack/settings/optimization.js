const optimization = () => ({
  splitChunks: {
    minChunks: 1,
    cacheGroups: {
      defaultVendors: {
        name: "chunk-vendors",
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: "initial",
      },
      common: {
        name: "chunk-common",
        minChunks: 2,
        priority: -20,
        chunks: "initial",
        reuseExistingChunk: true,
      },
    },
  },
});
module.exports = optimization;
