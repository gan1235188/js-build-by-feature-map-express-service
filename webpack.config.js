var webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.ts',
  mode: "production", //production, development
  output: {
    libraryTarget: 'umd',
    path: __dirname,
    filename: 'dist/index.js'
  },
  externals: [webpackNodeExternals()],
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts/,
        loader: 'ts-loader'
      }
    ]
  }
}