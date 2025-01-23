const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    ...getDefaultConfig(__dirname).resolver,
    blockList: /.*\/node_modules\/.*\/node_modules\/.*/,
  },
};
