const path = require('path')
const webpack = require ('webpack')

module.exports = {
  entry: {
    main: [
      './src/js/app.js',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
    ]
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}