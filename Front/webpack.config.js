const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.jsx'], 
  },

  output: {
    publicPath: '/',
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devtool: 'source-map',

  module: { 

    loaders: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },

      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['react', 'babel-preset-env', 'stage-2']
        }
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader','sass-loader'],
        }),
      }, 

      {
        test: /\.(png|jp(e*)g|svg|gif)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
    }

    ],

  },
  
  devServer: {
    historyApiFallback: true,
  },

  plugins: [

    new HtmlWebpackPlugin({
      title: 'TickTackToe', 
      template: './public/index.html'
    }), 

    new CleanWebpackPlugin(['dist']), 

    new ExtractTextPlugin('./css/[name].css'),
  ]

 }