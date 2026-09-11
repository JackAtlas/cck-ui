import { MaybeRefOrGetter } from 'vue'
import { GetStylesApi } from '../../core'
import { TimelineFactory, TimelineProps } from './timeline.types'

export interface TimelineContextValue {
  getStyles: GetStylesApi<TimelineFactory>
  active: MaybeRefOrGetter<TimelineProps['active']>
  align: MaybeRefOrGetter<TimelineProps['align']>
  reverseActive: MaybeRefOrGetter<TimelineProps['reverseActive']>
  total: MaybeRefOrGetter<number>
  unstyled: MaybeRefOrGetter<TimelineProps['unstyled']>
}
