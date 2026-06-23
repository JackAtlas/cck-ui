import { SFCWithInstall, withInstall } from '@cck-ui/core'
import ConfigProvider from './config-provider.vue'

export * from './color-functions'
export * from './config-provider.context'
export * from './config-provider.types'
export * from './default-theme'
export * from './theme.types'

export const CckConfigProvider: SFCWithInstall<typeof ConfigProvider> =
  withInstall(ConfigProvider)
export default CckConfigProvider
