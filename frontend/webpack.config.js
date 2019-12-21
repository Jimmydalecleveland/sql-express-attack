const path = require("path");

module.exports = {
  // mode defaults to 'production' if not set
  mode: "development",

  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },

  // add source maps
  devtool: "source-map",
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     // without additional settings, this will reference the .babelrc
      //     loader: "babel-loader"
      //   }
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },
  devServer: {
    contentBase: "./dist"
  }
};
