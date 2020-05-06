const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/simpleQuery.js',
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    library: {
      root: 'dynamoSimpleQuery',
      amd: 'dynamo-simple-query',
      commonjs: 'dynamo-simple-query'
    },
    libraryTarget: 'umd',
    globalObject: 'this' // Fix Window is not defined bug in webpack. per https://medium.com/@JakeXiao/window-is-undefined-in-umd-library-output-for-webpack4-858af1b881df
  },
}