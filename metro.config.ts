import { mergeConfig } from 'metro-config';
import { getDefaultConfig } from 'expo/metro-config';

const defaultConfig = getDefaultConfig(__dirname, { isCSSEnabled: true });
const config = mergeConfig(defaultConfig, {
  resolver: {
    assetExts: ['db', 'mp3', 'ttf', 'obj', 'png', 'jpg'],
    // Expo 49 issue: default metro config needs to include "mjs"
    // https://github.com/expo/expo/issues/23180
    sourceExts: [...(defaultConfig.resolver?.sourceExts || []), 'mjs'],
  },
});

// add nice web support with optimizing compiler + CSS extraction
const { withTamagui } = require('@tamagui/metro-plugin')
module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  outputCSS: './tamagui-web.css',
})
