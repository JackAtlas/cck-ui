import { tests } from '@cck-ui-tests/core'
import { describe } from 'vitest'
import { BlockquoteProps, BlockquoteStylesNames } from './blockquote.types'
import CBlockquote from '.'

describe('@cck-ui/core/blockquote', () => {
  tests.itSupportsSystemProps<BlockquoteProps, BlockquoteStylesNames>({
    component: CBlockquote,
    props: {},
    slots: {
      default: () => 'Life',
      icon: () => 'test-icon',
      cite: () => '- Forrest Gump',
    },
    varsResolver: true,
    children: true,
    name: 'CBlockquote',
    staticName: 'Blockquote',
    stylesApiSelectors: ['root', 'icon', 'cite'],
  })
})
