const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = (env, options) => {
  const isDevMode = options.mode === "development";

  return {
    entry: [`${path.join(__dirname, "www")}/index.jsx`],
    devtool: isDevMode ? "source-map" : false,
    resolve: {
      extensions: [".jsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "www"),
          ],
          exclude: /(node_modules|dist)/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, "dist")], {
        verbose: true,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(path.join(__dirname, "www"), "index.html"),
      }),
    ],
  };
};
