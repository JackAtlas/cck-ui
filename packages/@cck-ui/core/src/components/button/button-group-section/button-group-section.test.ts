import { tests } from '@cck-ui-tests/core'
import { describe } from 'vitest'
import {
  ButtonGroupSectionProps,
  ButtonGroupSectionStylesNames,
} from './button-group-section.types'
import { CButtonGroupSection } from '..'

const defaultProps: ButtonGroupSectionProps = {}

describe('@cck-ui/core/button-group-section', () => {
  tests.itSupportsSystemProps<ButtonGroupSectionProps, ButtonGroupSectionStylesNames>({
    component: CButtonGroupSection,
    props: defaultProps,
    varsResolver: true,
    children: true,
    name: 'CButtonGroupSection',
    staticName: 'ButtonGroupSection',
    stylesApiSelectors: ['groupSection'],
    refProp: 'section',
    providerStylesApi: false,
  })
})
