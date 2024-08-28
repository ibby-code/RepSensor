import {mergeConfig} from 'metro-config';
import {getDefaultConfig} from 'expo/metro-config';

const config = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    assetExts: ['db', 'mp3', 'ttf', 'obj', 'png', 'jpg'],
  },
});

module.exports = config;