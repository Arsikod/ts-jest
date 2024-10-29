const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devServer = {
  port: 3000,
  open: true,
};

module.exports = {
  mode: "development",
  devServer,
  entry: path.resolve(__dirname, "src", "index.tsx"),
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
