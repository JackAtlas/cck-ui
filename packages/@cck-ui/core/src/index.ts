import type { App, Plugin } from 'vue'
import {
  CButton,
  CCol,
  CGrid,
  CGroup,
  CLoader,
  CSimpleGrid,
  CText,
  CTransition,
  UnstyledButton,
} from './components'
import { CckConfigProvider, CBox } from './core'

const INSTALLED_KEY = Symbol('INSTALLED_KEY')

const components = [
  CckConfigProvider,
  CBox,
  CButton,
  CGrid,
  CCol,
  CGroup,
  CLoader,
  CSimpleGrid,
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
