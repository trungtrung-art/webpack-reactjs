const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const settings = {
  distPath: path.join(__dirname, "dist"),
  srcPath: path.join(__dirname, "src")
};

const config = {
  entry: './app/app.js',
  output: {
    filename: 'js/myBundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html'
    })
  ],
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env',
                {
                  "useBuiltIns": "usage",
                  "corejs": 3,
                  "targets": "defaults"
                }
              ],
              "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader"
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  }
}

if (currentTask == 'build') {
  config.mode = "production"
  config.module.rules[1].use[0] = MiniCssExtractPlugin.loader
  config.plugins.push(
    new CleanWebpackPlugin([settings.distPath], {
      verbose: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.[hash].css'
    }),
    new WebpackManifestPlugin(),
    new CopyPlugin([
      {
        from: path.join('app', 'assets/fonts'),
        to: path.join('fonts')
      },
      {
        from: path.join('app', 'assets/images'),
        to: path.join('images')
      }
    ])
  )
}

module.exports = config