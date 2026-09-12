import { tests } from '@cck-ui-tests/core'
import { describe } from 'vitest'
import { TitleProps, TitleStylesNames } from './title.types'
import CTitle from '.'

describe('@cck-ui/core/title', () => {
  tests.itSupportsSystemProps<TitleProps, TitleStylesNames>({
    component: CTitle,
    props: {},
    varsResolver: true,
    children: true,
    name: 'CTitle',
    staticName: 'Title',
    stylesApiSelectors: ['root'],
  })
})
