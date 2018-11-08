const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const pkg = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

const files = glob.sync("./project/templates/pages/**/!(_)*.pug").concat("./project/templates/icons/_symbols.pug");
console.log(files);

const contentBase = path.resolve(__dirname, "docs", ".vuepress", "public");
const production = process.env.NODE_ENV === "production";

module.exports = {
  mode: production ? "production" : "development",
  devtool: production ? "source-map" : "cheap-eval-source-map",
  entry: {
    theme: ["./project/styles/theme.scss"],
    print: ["./project/styles/print.scss"],
    head: ["./project/scripts/head/index.js"],
    app: ["./project/scripts/app/index.js"],
    libs: ["./project/scripts/libs/index.js"]
    // dev: ["./index.js"]
  },
  output: {
    path: contentBase,
    publicPath: "/assets/",
    hotUpdateChunkFilename: "./hot/[id].[hash].hot-update.js",
    hotUpdateMainFilename: "./hot/[hash].hot-update.json",
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
              sourceMap: true,
              url: true // we need this to load the fonts
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [require("autoprefixer")]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
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
            filename: `${file
              .replace("./project/templates/pages", ".")
              .replace("./project/templates/icons/_", "./")
              .replace(".pug", ".html")}`,
            template: file,
            inject: false,
            minify: false,
            variables: pkg.variables // insert all custom variables to pug
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
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new StyleLintPlugin({
        emitErrors: false // dont fail to compile
        // lintDirtyModulesOnly: true
      })
    ]),

  devServer: {
    publicPath: "/assets/",
    contentBase: contentBase,
    historyApiFallback: {
      index: "/assets/"
    },
    hot: true,
    hotOnly: false,
    inline: true,
    port: 8000
  }
};
