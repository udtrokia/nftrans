import "webpack-dev-server";

import type webpack from "webpack";

import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import AutoPreprocess from "svelte-preprocess";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: webpack.Configuration = {
  entry: {
    background: "./src/background.ts",
    popup: "./src/popup/index.ts",
  },
  output: {
    filename: "bundle.[name].js",
    path: path.resolve(__dirname, "extension"),
  },
  devServer: {
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(html|svelte)$/,
        use: {
          loader: "svelte-loader",
          options: {
            preprocess: AutoPreprocess(),
            emitCss: true,
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: ["manifest.json"],
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.[name].css",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@nftrans": path.resolve(__dirname, "src/"),
      "@design": path.resolve(__dirname, "design/"),
    },
  },
};

export default config;
