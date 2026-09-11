import { tests } from '@cck-ui-tests/core'
import { describe } from 'vitest'
import { ThemeIconProps, ThemeIconStylesNames } from './theme-icon.types'
import CThemeIcon from '.'

describe('@cck-ui/core/theme-icon', () => {
  tests.itSupportsSystemProps<ThemeIconProps, ThemeIconStylesNames>({
    component: CThemeIcon,
    props: {},
    varsResolver: true,
    children: true,
    name: 'CThemeIcon',
    staticName: 'ThemeIcon',
    stylesApiSelectors: ['root'],
  })
})
