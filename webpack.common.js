const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][ext]',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 40,
              },
              webp: {
                lossless: 0.2,
              },
              avif: {
                cqLevel: 0,
              },
            },
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            ignore: ['**/heros/**'],
          },
        },
      ],
    }),
    new WebpackPwaManifest({
      id: 'hunger-apps-1',
      start_url: '.',
      name: 'Hunger Apps',
      short_name: 'Hunger Apps',
      description: 'Hunger App is the website that helps you find the best restaurants in Indonesia, with ease and speed. We provide a comprehensive and reliable list of restaurants, as well as accurate reviews from users. Don\'t hesitate, visit Hunger App now and enjoy the best dining experience.',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#201609',
      fingerprints: false,
      publicPath: '.',
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/images/icon.png'),
          sizes: [72, 96, 128, 144, 152, 192, 256, 384, 512],
          destination: path.join('images/icons'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
};
