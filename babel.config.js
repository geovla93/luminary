module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-flow-strip-types', {loose: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/plugin-proposal-private-methods', {loose: true}],
    [
      'module-resolver',
      {
        alias: {
          // This needs to be mirrored in tsconfig.json
          '@ui/core/*': './src/ui/core/*',
          '@ui/core': './src/ui/core',
          '@redux/*': './src/redux/*',
          '@redux': './src/redux',
          '@hooks/*': './src/hooks/*',
          '@hooks': './src/hooks',
          '@utils/*': './src/utils/*',
          '@utils': './src/utils',
          '@i18n/*': './src/i18n/*',
          '@i18n': './src/i18n',
          '@assets/*': './src/assets/*',
          '@assets': './src/assets',
          '@components/*': './src/components/*',
          '@components': './src/components',
          '@screens/*': './src/screens/*',
          '@screens': './src/screens',
          '@itypes/*': './src/types/*',
          '@itypes': './src/types',
          src: './src',
          crypto: 'react-native-quick-crypto',
          stream: 'stream-browserify',
          buffer: '@craftzdog/react-native-buffer',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
