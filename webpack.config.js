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
          loader: "babel-loader",
          exclude: /node_modules/,
          // options: {
          //   cacheDirectory: true,
          // },
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
        {
          test: /\.css$/,
          loader: "style-loader!css-loader",
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
