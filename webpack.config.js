const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const dirApp = path.join(__dirname, 'src')

module.exports = {
  target: 'node',
  entry: {
    index: path.join(dirApp, 'index.js')
  },
  resolve: {
    extensions: ['*', '.js'],
    modules: [
      dirApp,
      'node_modules'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['_dist'])
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true,
          presets: ['@babel/preset-react', '@babel/env']
        }
      }
    ]
  }
}
