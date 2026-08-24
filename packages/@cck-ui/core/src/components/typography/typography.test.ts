import { describe } from 'vitest'
import { TypographyProps, TypographyStylesNames } from './typography.types'
import { tests } from '@cck-ui-tests/core'
import CTypography from '.'

const defaultProps: TypographyProps = {}

describe('@cck-ui/core/typography', () => {
  tests.itSupportsSystemProps<TypographyProps, TypographyStylesNames>({
    component: CTypography,
    props: defaultProps,
    children: true,
    name: 'CTypography',
    staticName: 'Typography',
    stylesApiSelectors: ['root'],
  })
})
