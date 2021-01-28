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
  entry: "./src/page/sign-in/sign-in.js",
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: "sign-in.bundle.js"
  },
});

var signUpConfig = Object.assign({}, config, {
  name: "sign-up",
  entry: "./src/page/sign-up/sign-up.js",
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: "sign-up.bundle.js"
  },
});

var homeConfig = Object.assign({}, config, {
  name: "home",
  entry: "./src/page/home/home.js",
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: "home.bundle.js"
  },
});

var compteConfig = Object.assign({}, config, {
  name: "compte",
  entry: "./src/page/compte/compte.js",
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: "compte.bundle.js"
  },
});

var createConfig = Object.assign({}, config, {
  name: "create",
  entry: "./src/page/article/create.js",
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: "create.bundle.js"
  },
});

var modificationConfig = Object.assign({}, config, {
  name: "modification",
  entry: "./src/page/compte/modification.js",
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: "modification.bundle.js"
  },
});

var partageConfig = Object.assign({}, config, {
  name: "partage",
  entry: "./src/page/article/partage.js",
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: "partage.bundle.js"
  },
});


// Return Array of Configurations
module.exports = [
  signInConfig, signUpConfig, homeConfig, compteConfig, createConfig, modificationConfig, partageConfig
];