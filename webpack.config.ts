import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import "webpack-dev-server";

const config: Configuration = {
  mode: "development", // mode of development
  devtool: "inline-source-map",
  entry: "./src/index.tsx", // entry file
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()],
              }),
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      '@tanstack/react-query': require.resolve('@tanstack/react-query').replace('index.js', 'index.cjs'),
    }
  },
  output: {
    path: path.resolve(__dirname, "dist"), //path to output the build file
    filename: "bundle.js", //name of build file
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html", // create a template
    }),
    new ReactRefreshWebpackPlugin({ overlay: false }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  devServer: {
    host: "localhost", // where to run
    historyApiFallback: true,
    port: 3000, //given port to exec. app
    open: true,  // open new tab
  },
};

export default config;
