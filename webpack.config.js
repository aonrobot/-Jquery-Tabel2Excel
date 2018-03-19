var path = require('path');

const config = {
  target: 'web',
  entry: {
    app: './src/js/table2excel.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'table2excel.min.js'
  },
  module: {
    rules: [
      { test: /\.js?$/, use: 'babel-loader' }
    ]
  }
};

module.exports = config;