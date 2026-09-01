import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import CardSection from './card-section/card-section.vue'
import classes from './card.module.css'
import { varsResolver } from './card.utils'
import Card from './card.vue'

const CardWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Card, classes), varsResolver))
)
const CardSectionWithStatic = withPropsFactory(withExtend(withClasses(CardSection, classes)))

export const CCardSection: SFCWithInstallAndClasses<typeof CardSection> =
  withInstall(CardSectionWithStatic)
export const CCard: SFCWithInstallAndClasses<typeof Card, typeof classes> & {
  Section: typeof CardSection
} = withInstall(CardWithStatic, { Section: CardSection })

export default CCard

export * from './card-section/card-section.types'
export * from './card.types'
