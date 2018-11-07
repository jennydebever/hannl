const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const pkg = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

const files = glob.sync("./project/templates/pages/**/!(_)*.pug");
console.log(files);

const contentBase = path.resolve(__dirname, "docs", ".vuepress", "public");

const production = process.env.NODE_ENV !== "production";

module.exports = {
  mode: production ? "production" : "development",
  entry: {
    theme: ["./project/styles/theme.scss"],
    print: ["./project/styles/print.scss"],
    head: ["./project/scripts/head/index.js"],
    app: ["./project/scripts/app/index.js"],
    libs: ["./project/scripts/libs/index.js"]
  },
  output: {
    path: contentBase,
    publicPath: "/",
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(pug|jade)$/,
        exclude: /node_modules/,
        loader: "pug-lint-loader",
        options: Object.assign(
          {
            emitError: false // dont fail to compile
          },
          require("./.pug-lintrc")
        ),
        enforce: "pre"
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false // leave url() alone
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")]
            }
          },
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts/"
        }
      }
    ]
  },
  plugins: []
    .concat(
      files.map(
        file =>
          new HtmlWebpackPlugin({
            title: "han.nl",
            filename: `${file.replace("./project/templates/pages", ".").replace(".pug", ".html")}`,
            template: file,
            inject: false,
            minify: false
          })
      )
    )
    .concat([
      new WriteFilePlugin(), // actually write files while in devServer, for vuepress
      new webpack.BannerPlugin({
        banner: `${pkg.name} version: ${pkg.version},
hash:[hash],
chunkhash:[chunkhash],
name:[name],
filebase:[filebase],
query:[query],
file:[file]
        `
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new StyleLintPlugin({
        emitErrors: false // dont fail to compile
        // lintDirtyModulesOnly: true
      })
    ]),

  devServer: {
    publicPath: "/",
    contentBase: contentBase,
    historyApiFallback: true,
    hot: true,
    hotOnly: true,
    inline: true,
    port: 8000
  }
};
