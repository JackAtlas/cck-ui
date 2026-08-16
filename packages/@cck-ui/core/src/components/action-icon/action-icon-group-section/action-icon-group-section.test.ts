import { describe } from 'vitest'
import {
  ActionIconGroupSectionProps,
  ActionIconGroupSectionStylesNames,
} from './action-icon-group-section.types'
import { tests } from '@cck-ui-tests/core'
import { CActionIconGroupSection } from '..'

const defaultProps: ActionIconGroupSectionProps = {}

describe('@cck-ui/core/action-icon-group-section', () => {
  tests.itSupportsSystemProps<ActionIconGroupSectionProps, ActionIconGroupSectionStylesNames>({
    component: CActionIconGroupSection,
    props: defaultProps,
    varsResolver: true,
    children: true,
    name: 'CActionIconGroupSection',
    staticName: 'ActionIconGroupSection',
    stylesApiSelectors: ['groupSection'],
    refProp: 'section',
    providerStylesApi: false,
  })
})
