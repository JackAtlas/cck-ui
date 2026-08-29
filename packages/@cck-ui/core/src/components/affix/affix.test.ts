// affix.test.ts
import { describe } from 'vitest'
import { tests } from '@cck-ui-tests/core'
import CAffix from '.'
import type { AffixProps, AffixStylesNames } from './affix.types'

const defaultProps: AffixProps = {}

describe('@cck-ui/core/affix', () => {
  tests.itSupportsSystemProps<AffixProps, AffixStylesNames>({
    component: CAffix,
    props: defaultProps,
    varsResolver: true,
    children: true,
    name: 'CAffix',
    staticName: 'Affix',
    stylesApiSelectors: ['root'],
  })
})
