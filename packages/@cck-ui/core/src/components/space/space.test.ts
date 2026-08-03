import { tests } from '@cck-ui-tests/core'
import { describe } from 'vitest'
import CSpace from '.'
import { SpaceProps } from './space.types'

const defaultProps: SpaceProps = {}

describe('@cck-ui/core/space', () => {
  tests.itSupportsSystemProps<SpaceProps>({
    component: CSpace,
    props: defaultProps,
    children: true,
    classes: false,
    name: 'CSpace',
    staticName: 'Space',
  })
})
