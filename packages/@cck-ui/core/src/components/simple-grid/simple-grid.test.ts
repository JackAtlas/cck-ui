import { describe } from 'vitest'
import { SimpleGridProps, SimpleGridStylesNames } from './simple-grid.types'
import { tests } from '@cck-ui-tests/core'
import CSimpleGrid from '.'

const defaultProps: SimpleGridProps = {}

describe('@cck-ui/core/SimpleGrid', () => {
  tests.itSupportsSystemProps<SimpleGridProps, SimpleGridStylesNames>({
    component: CSimpleGrid,
    props: defaultProps,
    children: true,
    name: 'CSimpleGrid',
    staticName: 'SimpleGrid',
    stylesApiSelectors: ['root'],
  })
})
