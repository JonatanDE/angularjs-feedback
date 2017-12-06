module.exports = {
  entry: {
    app: './app/app.js'
  },
  output: {
    path: __dirname,
    publicPath: '/app/',
    filename: 'bundle.js',
    chunkFilename: '[name].js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },
    ],
  },
  devServer: {
    contentBase: __dirname + "/app",
    inline: true,
    host: '0.0.0.0',
    port: 8080,
  },
  devtool: "#inline-source-map"
}
