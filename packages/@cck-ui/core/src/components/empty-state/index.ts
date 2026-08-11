import EmptyStateActions from './empty-state-actions/empty-state-actions.vue'
import EmptyStateDescription from './empty-state-description/empty-state-description.vue'
import EmptyStateIndicator from './empty-state-indicator/empty-state-indicator.vue'
import EmptyStateTitle from './empty-state-title/empty-state-title.vue'
import EmptyState from './empty-state.vue'
import classes from './empty-state.module.css'
import { varsResolver } from './empty-state.utils'
import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'

const EmptyStateActionsWithStatic = withPropsFactory(
  withExtend(withClasses(EmptyStateActions, classes))
)
const EmptyStateDescriptionWithStatic = withPropsFactory(
  withExtend(withClasses(EmptyStateDescription, classes))
)
const EmptyStateIndicatorWithStatic = withPropsFactory(
  withExtend(withClasses(EmptyStateIndicator, classes))
)
const EmptyStateTitleWithStatic = withPropsFactory(
  withExtend(withClasses(EmptyStateTitle, classes))
)
const EmptyStateWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(EmptyState, classes), varsResolver))
)

export const CEmptyStateActions: SFCWithInstallAndClasses<
  typeof EmptyStateActions,
  typeof classes
> = withInstall(EmptyStateActionsWithStatic)
export const CEmptyStateDescription: SFCWithInstallAndClasses<
  typeof EmptyStateDescription,
  typeof classes
> = withInstall(EmptyStateDescriptionWithStatic)
export const CEmptyStateIndicator: SFCWithInstallAndClasses<
  typeof EmptyStateIndicator,
  typeof classes
> = withInstall(EmptyStateIndicatorWithStatic)
export const CEmptyStateTitle: SFCWithInstallAndClasses<typeof EmptyStateTitle, typeof classes> =
  withInstall(EmptyStateTitleWithStatic)
export const CEmptyState: SFCWithInstallAndClasses<typeof EmptyState, typeof classes> & {
  CEmptyStateActions: typeof CEmptyStateActions
  CEmptyStateDescription: typeof CEmptyStateDescription
  CEmptyStateIndicator: typeof CEmptyStateIndicator
  CEmptyStateTitle: typeof CEmptyStateTitle
} = withInstall(EmptyStateWithStatic, {
  CEmptyStateActions,
  CEmptyStateDescription,
  CEmptyStateIndicator,
  CEmptyStateTitle,
})

export default CEmptyState

export * from './empty-state-actions/empty-state-actions.types'
export * from './empty-state-description/empty-state-description.types'
export * from './empty-state-indicator/empty-state-indicator.types'
export * from './empty-state-title/empty-state-title.types'
export * from './empty-state.types'
