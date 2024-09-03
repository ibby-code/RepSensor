import { config } from '@tamagui/config/v3'
import { color, radius, size, space, themes, zIndex } from '@tamagui/themes'
import { createTamagui, createTokens } from 'tamagui' // or '@tamagui/core'

const tokens = createTokens({
    size,
    space,
    zIndex,
    color,
    radius,
})

//export const tamaguiConfig = createTamagui({...config, themes, tokens})
export const tamaguiConfig = createTamagui(config)

export type Conf = typeof tamaguiConfig
declare module 'tamagui' {

    // or '@tamagui/core'

    // overrides TamaguiCustomConfig so your custom types

    // work everywhere you import `tamagui`

    interface TamaguiCustomConfig extends Conf { }

}
export default tamaguiConfig 