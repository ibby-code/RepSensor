import { config } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui' // or '@tamagui/core'

export const tamaguiConfig = createTamagui(config)

export type Conf = typeof tamaguiConfig 
declare module 'tamagui' {

  // or '@tamagui/core'

  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  interface TamaguiCustomConfig extends Conf {}

}
export default tamaguiConfig 