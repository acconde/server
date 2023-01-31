module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules[/\\](?!react-native-gifted-chat|react-native-lightbox|react-native-parsed-text|react-native-typing-animation)/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        configFile: false,
        presets: [
          ['@babel/preset-env', { useBuiltIns: 'usage', corejs: '^3.17.3' }],
          '@babel/preset-react',
        ],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  });

  return config
};

// const { override, fixBabelImports, addLessLoader } = require('customize-cra');

// module.exports = override(
//   // Load antd
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: true,
//   }),
//   // Add `javascriptEnabled` and antd theme configuration
//   // to the Less loader
//   addLessLoader({
//     lessOptions: {
//       javascriptEnabled: true,
//       modifyVars: { '@primary-color': '#1DA57A' },
//     }
//   }),
// );