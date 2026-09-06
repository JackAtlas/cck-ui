import { SFCWithInstall, withClasses, withExtend, withInstall, withPropsFactory } from '../../core'
import Highlight from './highlight.vue'
import classes from '../text/text.module.css'

const HighlightWithStatic = withPropsFactory(withExtend(withClasses(Highlight, classes)))

export const CHighlight: SFCWithInstall<typeof Highlight> = withInstall(HighlightWithStatic)

export default CHighlight

export * from './highlight.types'
