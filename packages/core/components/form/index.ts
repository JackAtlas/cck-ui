import { SFCWithInstall, withInstall } from '@cck-ui/utils'
import Form from './src/form.vue'

export const CForm: SFCWithInstall<typeof Form> = withInstall(Form)
export default CForm

export * from './src/hooks'
export * from './src/constants'
export * from './src/form.types'
