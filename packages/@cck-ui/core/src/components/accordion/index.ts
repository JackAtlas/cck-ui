import {
  SFCWithInstall,
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import AccordionChevron from './accordion-chevron/accordion-chevron.vue'
import AccordionControl from './accordion-control/accordion-control.vue'
import AccordionItem from './accordion-item/accordion-item.vue'
import AccordionPanel from './accordion-panel/accordion-panel.vue'
import classes from './accordion.module.css'
import { varsResolver } from './accordion.utils'
import Accordion from './accordion.vue'

const AccordionItemWithStatic = withPropsFactory(withExtend(AccordionItem))
const AccordionControlWithStatic = withPropsFactory(withExtend(AccordionControl))
const AccordionPanelWithStatic = withPropsFactory(withExtend(AccordionPanel))
const AccordionWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Accordion, classes), varsResolver))
)

export const CAccordionItem: SFCWithInstall<typeof AccordionItem> =
  withInstall(AccordionItemWithStatic)
export const CAccordionControl: SFCWithInstall<typeof AccordionControl> = withInstall(
  AccordionControlWithStatic
)
export const CAccordionPanel: SFCWithInstall<typeof AccordionPanel> =
  withInstall(AccordionPanelWithStatic)
export const CAccordion: SFCWithInstallAndClasses<typeof Accordion, typeof classes> & {
  Item: typeof AccordionItem
  Control: typeof AccordionControl
  Panel: typeof AccordionPanel
  Chevron: typeof AccordionChevron
} = withInstall(AccordionWithStatic, {
  Item: AccordionItem,
  Control: AccordionControl,
  Panel: AccordionPanel,
  Chevron: AccordionChevron,
})

export default CAccordion

export { AccordionChevron }

export * from './accordion-item/accordion-item.types'
export * from './accordion-panel/accordion-panel.types'
export * from './accordion.types'
