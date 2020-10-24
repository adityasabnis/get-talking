const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const settings = {
  wwwPath: path.join(__dirname, "www"),
  srcPath: path.join(__dirname, "src"),
  distPath: path.join(__dirname, "dist"),
};

module.exports = (env, options) => {
  const isDevMode = options.mode === "development";

  return {
    entry: [`${settings.wwwPath}/index.jsx`],
    devtool: isDevMode ? "source-map" : false,
    resolve: {
      extensions: [".jsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [settings.srcPath, settings.wwwPath],
          exclude: /(node_modules|dist)/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([settings.distPath], {
        verbose: true,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(settings.wwwPath, "index.html"),
      }),
    ],
  };
};
