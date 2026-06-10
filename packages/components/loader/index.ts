import { SFCWithInstall, withInstall } from '@cck-ui/utils'
import Loader from './src/loader.vue'
import { CLoadersRecord } from './src/loader.types'

import Bars from './src/loaders/bars.vue'
import Dots from './src/loaders/dots.vue'
import Oval from './src/loaders/oval.vue'

export const CDefaultLoaders: CLoadersRecord = {
  bars: Bars,
  dots: Dots,
  oval: Oval
}

export const CLoader: SFCWithInstall<typeof Loader> = withInstall(Loader)
export default CLoader

export * from './src/loader.types'
