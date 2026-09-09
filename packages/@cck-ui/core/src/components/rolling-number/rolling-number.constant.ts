import { InjectionKey } from 'vue'
import { RollingNumberContextValue } from './rolling-number.context'

export const STRIP_CELLS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1']

export const ROLLING_NUMBER_KEY: InjectionKey<RollingNumberContextValue> =
  Symbol('RollingNumberContext')
