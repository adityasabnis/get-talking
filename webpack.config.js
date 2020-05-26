const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const settings = {
  distPath: path.join(__dirname, "dist"),
  srcPath: path.join(__dirname, "src"),
  wwwPath: path.join(__dirname, "www"),
};

module.exports = (env, options) => {
  const isDevMode = options.mode === "development";

  return {
    devtool: isDevMode ? "source-map" : false,
    resolve: {
      extensions: [".jsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ["babel-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevMode,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([settings.distPath], {
        verbose: true,
      }),
      new HtmlWebpackPlugin({
        template: path.join(settings.wwwPath, "index.html"),
      }),
    ],
  };
};
