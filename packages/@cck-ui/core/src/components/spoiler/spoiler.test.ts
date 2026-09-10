import { describe } from 'vitest'
import { SpoilerProps, SpoilerStylesNames } from './spoiler.types'
import { tests } from '@cck-ui-tests/core'
import CSpoiler from '.'

const defaultProps: SpoilerProps = {
  maxHeight: 100,
}

const defaultSlots = {
  showLabel: () => 'show',
  hideLabel: () => 'hide',
  default: () => 'test-content',
}

describe('@cck-ui/core/spoiler', () => {
  tests.itSupportsSystemProps<SpoilerProps, SpoilerStylesNames>({
    component: CSpoiler,
    props: defaultProps,
    slots: defaultSlots,
    varsResolver: true,
    children: true,
    name: 'CSpoiler',
    staticName: 'Spoiler',
    stylesApiSelectors: ['root', 'content'],
  })
})
