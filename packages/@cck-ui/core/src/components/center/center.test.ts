import { describe } from 'vitest'
import { tests } from '@cck-ui-tests/core'
import CCenter from '.'
import { CenterProps, CenterStylesNames } from './center.types'

const defaultProps: CenterProps = {}

describe('@cck-ui/core/center', () => {
  tests.itSupportsSystemProps<CenterProps, CenterStylesNames>({
    component: CCenter,
    props: defaultProps,
    polymorphic: true,
    children: true,
    name: 'CCenter',
    staticName: 'Center',
    stylesApiSelectors: ['root'],
  })
})
