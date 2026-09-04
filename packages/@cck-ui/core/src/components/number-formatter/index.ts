import { SFCWithInstall, withExtend, withInstall, withPropsFactory } from '../../core'
import NumberFormatter from './number-formatter.vue'

const NumberFormatterWithStatic = withPropsFactory(withExtend(NumberFormatter))

export const CNumberFormatter: SFCWithInstall<typeof NumberFormatter> =
  withInstall(NumberFormatterWithStatic)

export default CNumberFormatter

export * from './number-formatter.types'
