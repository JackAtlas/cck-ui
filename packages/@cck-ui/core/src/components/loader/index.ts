import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import Loader from './loader.vue'
import { CLoadersRecord } from './loader.types.js'
import classes from './loader.module.css'

import Bars from './loaders/bars.vue'
import Dots from './loaders/dots.vue'
import Oval from './loaders/oval.vue'

export const CDefaultLoaders: CLoadersRecord = {
  bars: Bars,
  dots: Dots,
  oval: Oval,
}

import { varsResolver } from './loader.utils'

const LoaderWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Loader, classes), varsResolver))
)

export const CLoader: SFCWithInstallAndClasses<typeof Loader, typeof classes> =
  withInstall(LoaderWithStatic)
export default CLoader

export * from './loader.types'
