const path = require('path');

var config = {
  module: {
      rules: [
          {
              test: /\.s[ac]ss$/i,
              use: [
              'style-loader',
              'css-loader',
              'sass-loader',
              ],
          },
      ],
  },
};

var signInConfig = Object.assign({}, config, {
  name: "sign-in",
  entry: "./src/sign-in/sign-in.js",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "sign-in.bundle.js"
  },
});

var signUpConfig = Object.assign({}, config, {
  name: "sign-up",
  entry: "./src/sign-up/sign-up.js",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "sign-up.bundle.js"
  },
});

var compteConfig = Object.assign({}, config, {
  name: "compte",
  entry: "./src/compte/compte.js",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "compte.bundle.js"
  },
});


// Return Array of Configurations
module.exports = [
  signInConfig, signUpConfig, compteConfig
];