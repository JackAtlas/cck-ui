import { InjectionKey } from 'vue'
import { TimelineContextValue } from './timeline.context'

export const TIMELINE_CONTEXT_KEY: InjectionKey<TimelineContextValue> = Symbol('TimelineContext')
