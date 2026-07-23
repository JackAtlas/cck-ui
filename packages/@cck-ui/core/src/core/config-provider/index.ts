import { SFCWithInstall, withInstall } from '../utils'
import ConfigProvider from './config-provider.vue'

export * from './cck-css-variables'
export * from './color-functions'
export * from './config-provider.context'
export * from './config-provider.types'
export * from './create-theme/create-theme'
export * from './default-theme'
export * from './theme.types'
export * from './use-cck-color-scheme'
export { useComponentProps } from './use-component-props/use-component-props'

export const CckConfigProvider: SFCWithInstall<typeof ConfigProvider> = withInstall(ConfigProvider)
export default CckConfigProvider
