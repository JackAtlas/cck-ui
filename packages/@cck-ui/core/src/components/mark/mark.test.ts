import { tests } from '@cck-ui-tests/core'
import { describe } from 'vitest'
import { MarkProps, MarkStylesNames } from './mark.types'
import CMark from '.'

describe('@cck-ui/core/mark', () => {
  tests.itSupportsSystemProps<MarkProps, MarkStylesNames>({
    component: CMark,
    props: {},
    varsResolver: true,
    children: true,
    name: 'CMark',
    staticName: 'Mark',
    stylesApiSelectors: ['root'],
  })
})
