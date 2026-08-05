import type { App, Plugin } from 'vue'
import {
  CAspectRatio,
  CButton,
  CButtonGroup,
  CButtonGroupSection,
  CCenter,
  CCol,
  CContainer,
  CGrid,
  CGroup,
  CLoader,
  CSimpleGrid,
  CSpace,
  CSplitter,
  CSplitterPane,
  CStack,
  CText,
  CTransition,
  UnstyledButton,
} from './components'
import { CckConfigProvider, CBox } from './core'

const INSTALLED_KEY = Symbol('INSTALLED_KEY')

const components = [
  CckConfigProvider,
  CBox,
  CAspectRatio,
  CButton,
  CButtonGroup,
  CButtonGroupSection,
  CCenter,
  CCol,
  CContainer,
  CGrid,
  CGroup,
  CLoader,
  CSimpleGrid,
  CSpace,
  CSplitter,
  CSplitterPane,
  CStack,
  CText,
  CTransition,
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
