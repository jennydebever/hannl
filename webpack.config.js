const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const files = glob.sync("./project/templates/pages/**/!(_)*.pug");
console.log(files);

const contentBase = path.resolve(__dirname, "docs", ".vuepress", "public");

module.exports = {
  mode: "development",
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
      // {
      //   test: /\.(pug|jade)$/,
      //   exclude: /node_modules/,
      //   loader: "pug-lint-loader",
      //   options: Object.assign(
      //     {
      //       emitError: false
      //     },
      //     require("./.puglintrc.js")
      //   ),
      //   enforce: "pre"
      // },
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
          process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader?url=false", // translates CSS into CommonJS
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
  // optimization: {
  //   minimizer: [new UglifyJsPlugin()]
  // },
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
      new WriteFilePlugin(),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
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
