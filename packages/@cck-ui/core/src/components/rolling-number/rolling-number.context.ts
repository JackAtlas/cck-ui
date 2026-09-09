import { GetStylesApi } from '../../core'
import { RollingNumberFactory } from './rolling-number.types'

export interface RollingNumberContextValue {
  getStyles: GetStylesApi<RollingNumberFactory>
}
