import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import TimelineItem from './timeline-item/timeline-item.vue'
import classes from './timeline.module.css'
import { varsResolver } from './timeline.utils'
import Timeline from './timeline.vue'

const TimelineWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Timeline, classes), varsResolver))
)

const TimelineItemWithStatic = withPropsFactory(withExtend(withClasses(TimelineItem, classes)))

export const CTimelineItem: SFCWithInstallAndClasses<typeof TimelineItem> =
  withInstall(TimelineItemWithStatic)

export const CTimeline: SFCWithInstallAndClasses<typeof Timeline> & { Item: typeof TimelineItem } =
  withInstall(TimelineWithStatic, { Item: TimelineItem })

export default CTimeline

export * from './timeline-item/timeline-item.types'
export * from './timeline.types'
