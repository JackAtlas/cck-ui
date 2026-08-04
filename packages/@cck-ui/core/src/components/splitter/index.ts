import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import Splitter from './splitter.vue'
import SplitterPane from './splitter-pane/splitter-pane.vue'
import classes from './splitter.module.css'
import { varsResolver } from './splitter.utils'

const SplitterPaneWithStatic = withPropsFactory(withExtend(withClasses(SplitterPane, classes)))
const SplitterWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Splitter, classes), varsResolver))
)

export const CSplitterPane: SFCWithInstallAndClasses<typeof SplitterPane, typeof classes> =
  withInstall(SplitterPaneWithStatic)
export const CSplitter: SFCWithInstallAndClasses<typeof Splitter, typeof classes> & {
  CSplitterPane: typeof CSplitterPane
} = withInstall(SplitterWithStatic, { CSplitterPane })

export default CSplitter

export * from './splitter-pane/splitter-pane.types'
export * from './splitter.types'
