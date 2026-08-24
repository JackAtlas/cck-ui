import { describe } from 'vitest'
import { VisuallyHiddenProps, VisuallyHiddenStylesNames } from './visually-hidden.types'
import { tests } from '@cck-ui-tests/core'
import VisuallyHidden from './visually-hidden.vue'

const defaultProps: VisuallyHiddenProps = {}

describe('@cck-ui/core/visually-hidden', () => {
  tests.itSupportsSystemProps<VisuallyHiddenProps, VisuallyHiddenStylesNames>({
    component: VisuallyHidden,
    props: defaultProps,
    children: true,
    name: 'CVisuallyHidden',
    staticName: 'VisuallyHidden',
    stylesApiSelectors: ['root'],
  })
})
