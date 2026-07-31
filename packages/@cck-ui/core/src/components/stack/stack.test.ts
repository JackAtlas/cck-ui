import { describe } from 'vitest'
import { StackProps, StackStylesNames } from './stack.types'
import { tests } from '@cck-ui-tests/core'
import CStack from '.'

const defaultProps: StackProps = {}

describe('@cck-ui/core/Stack', () => {
  tests.itSupportsSystemProps<StackProps, StackStylesNames>({
    component: CStack,
    props: defaultProps,
    varsResolver: true,
    children: true,
    name: 'CStack',
    staticName: 'Stack',
    stylesApiSelectors: ['root'],
  })
})
