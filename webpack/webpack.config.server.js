import path from 'path';
import webpack from 'webpack';
import qs from 'querystring';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

// Paths
const root = process.cwd();
const src  = path.join(root, 'src');
const build = path.join(root, 'build');
const universal = path.join(src, 'universal');
const server = path.join(src, 'server');

const serverInclude = [server, universal];

export default {
  context: src,
  entry: {
    prerender: './universal/routes/Routes.js'
  },
  target: 'node',
  output: {
    path: build,
    chunkFilename: '[name]_[chunkhash].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js'],
    modules: [src, 'node_modules']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new CopyWebpackPlugin([
      { from: './server/public', to: 'public' }
    ]),
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
    new webpack.DefinePlugin({
      '__CLIENT__': false,
      '__PRODUCTION__': true,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    loaders: [
      {test: /\.(png|j|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      },

      {test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file?name=material-design-icons/iconfont/[name].[ext]'
        }
      },

      {
        test: /\.scss$/,
        include: serverInclude,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader'
            },
            'postcss-loader',
            'sass-loader'
          ]
        }),
      },

      {
        test: /^(?!.*\.spec\.js$).*\.js$/,
        loader: 'babel-loader',
        include: serverInclude
      }

    ]
  }
};
