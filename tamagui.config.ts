import { config } from '@tamagui/config/v3'
import { createTamagui, createTokens } from 'tamagui' // or '@tamagui/core'
import { createInterFont } from '@tamagui/font-inter'

const headingFont = createInterFont();
const bodyFont = createInterFont();
const tamaguiConfig = createTamagui({
  ...config,
  fonts: {
    ...config.fonts,
    heading: headingFont,
    body: bodyFont,
  },
});

export type Conf = typeof tamaguiConfig
declare module 'tamagui' {

    // or '@tamagui/core'

    // overrides TamaguiCustomConfig so your custom types

    // work everywhere you import `tamagui`

    interface TamaguiCustomConfig extends Conf { }

}
export default tamaguiConfig 