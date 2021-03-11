import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

// popup.html
const POPUP = `<div id='popup'></div>`;

const config: webpack.Configuration = {
  entry: {
    background: "./src/background.ts",
    popup: "./src/popup.tsx",
    reload: "./src/reload.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "extension"),
  },
  devServer: {
    port: 9292,
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      templateContent: POPUP,
      chunks: ["popup"],
    }),
    new CopyPlugin({
      patterns: ["manifest.json", { from: "public", to: "public" }],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

export default config;
