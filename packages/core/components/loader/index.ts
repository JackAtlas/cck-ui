import { SFCWithInstall, withInstall } from '@cck-ui/core'
import Loader from './loader.vue'
import { CLoadersRecord } from './loader.types.js'

import Bars from './loaders/bars.vue'
import Dots from './loaders/dots.vue'
import Oval from './loaders/oval.vue'

export const CDefaultLoaders: CLoadersRecord = {
  bars: Bars,
  dots: Dots,
  oval: Oval
}

export const CLoader: SFCWithInstall<typeof Loader> = withInstall(Loader)
export default CLoader

export * from './loader.types.js'
