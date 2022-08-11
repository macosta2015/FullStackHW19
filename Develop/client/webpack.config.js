const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'PWA.Text.Editor'
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: path.resolve(__dirname, './src-sw.js'),
        swDest: path.resolve(__dirname, '../client/dist/src-sw.js')
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'J.A.T.E Text Editor',
        short_name: 'J.A.T.E.',
        description: 'PWA.Text.Editor',
        background_color: '#2D2E28',
        theme_color: '#37B1E4',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/logo.png'),
            sizes: [96, 128, 192, 384, 512],
            destination: path.join('assets', 'icons')
          },
        ],
      }),
      new CopyWebpackPlugin({ 
        patterns: [ 
         // relative path is from src
         { from: './favicon.ico' }, 
        ]
     })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};