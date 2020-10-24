const path = require("path");

const settings = {
  srcPath: path.join(__dirname, "src"),
  distPath: path.join(__dirname, "dist"),
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: settings.srcPath,
        exclude: /(node_modules|dist)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  output: {
    path: settings.distPath,
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  externals: {
    react: "commonjs react",
  },
};
