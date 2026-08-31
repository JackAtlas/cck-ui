import type { App, Plugin } from 'vue'
import {
  CActionIcon,
  CActionIconGroup,
  CActionIconGroupSection,
  CAffix,
  CAlert,
  CAnchor,
  CAspectRatio,
  CAvatar,
  CAvatarGroup,
  CBackgroundImage,
  CBadge,
  CBreadcrumbs,
  CBurger,
  CButton,
  CButtonGroup,
  CButtonGroupSection,
  CCenter,
  CCloseButton,
  CCol,
  CContainer,
  CCopyButton,
  CDivider,
  CEmptyState,
  CEmptyStateActions,
  CEmptyStateDescription,
  CEmptyStateIndicator,
  CEmptyStateTitle,
  CFileButton,
  CFlex,
  CFocusTrap,
  CGrid,
  CGroup,
  CImage,
  CLoader,
  CPaper,
  CPortal,
  CSemiCircleProgress,
  CSimpleGrid,
  CSkeleton,
  CSpace,
  CSplitter,
  CSplitterPane,
  CStack,
  CText,
  CTransition,
  CTypography,
  CVisuallyHidden,
  UnstyledButton,
} from './components'
import { CckConfigProvider, CBox } from './core'

const INSTALLED_KEY = Symbol('INSTALLED_KEY')

const components = [
  CckConfigProvider,
  CBox,
  CActionIcon,
  CActionIconGroup,
  CActionIconGroupSection,
  CAffix,
  CAlert,
  CAnchor,
  CAspectRatio,
  CAvatar,
  CAvatarGroup,
  CBackgroundImage,
  CBadge,
  CBreadcrumbs,
  CBurger,
  CButton,
  CButtonGroup,
  CButtonGroupSection,
  CCenter,
  CCloseButton,
  CCol,
  CContainer,
  CCopyButton,
  CDivider,
  CEmptyState,
  CEmptyStateActions,
  CEmptyStateDescription,
  CEmptyStateIndicator,
  CEmptyStateTitle,
  CFileButton,
  CFlex,
  CFocusTrap,
  CGrid,
  CGroup,
  CImage,
  CLoader,
  CPaper,
  CPortal,
  CSemiCircleProgress,
  CSimpleGrid,
  CSkeleton,
  CSpace,
  CSplitter,
  CSplitterPane,
  CStack,
  CText,
  CTransition,
  CTypography,
  CVisuallyHidden,
  UnstyledButton,
]

const CckUI: Plugin = {
  install(app: App) {
    if ((app as any)[INSTALLED_KEY]) {
      return
    }
    ;(app as any)[INSTALLED_KEY] = true
    components.forEach((c) => {
      if (c.name) {
        app.component(c.name, c)
      }
    })
  },
}

export default CckUI
export { CckUI }

export * from './components'
export * from './core'
