const path = require('path');

module.exports = {
  context: __dirname,
  entry: './lib/entry.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-maps'
};
