const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: 'CHANGE ME',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', {
                targets: 'defaults',
                plugins: ['@babel/plugin-proposal-class-properties'],
              }],
            ],
          },
        },
      },
      {
        test: /\.s?css/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};
