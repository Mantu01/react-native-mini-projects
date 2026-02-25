const { getDefaultConfig } = require('@react-native/metro-config')
const { withUniwindConfig } = require('uniwind/metro'); 

const config = getDefaultConfig(__dirname);

// your metro modifications

module.exports = withUniwindConfig(config, { 
  cssEntryFile: './global.css',
  dtsFile: './src/uniwind-types.d.ts'
});