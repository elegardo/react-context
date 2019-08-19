const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var path = require('path');

const PATHS = {
  build: path.join(__dirname, 'dist')
};

module.exports = (env) => [
  {
  entry: './src/index.js',
  output: {
    path: PATHS.build,
    filename: 'app-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        use: "url-loader"
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000,
          },
        },
      },      
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.tsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ]
}];
