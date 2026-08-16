import { describe } from 'vitest'
import { ActionIconProps, ActionIconStylesNames } from './action-icon.types'
import { tests } from '@cck-ui-tests/core'
import CActionIcon from '.'

const defaultProps: ActionIconProps = {
  loading: true,
}

describe('@cck-ui/core/action-icon', () => {
  tests.axe([
    {
      component: CActionIcon,
      options: {
        props: { 'aria-label': 'test' },
      },
    },
  ])

  tests.itSupportsFocusEvent<ActionIconProps>({
    component: CActionIcon,
    props: defaultProps,
  })

  tests.itSupportsSystemProps<ActionIconProps, ActionIconStylesNames>({
    component: CActionIcon,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    name: 'CActionIcon',
    staticName: 'ActionIcon',
    stylesApiSelectors: ['root', 'icon', 'loader'],
  })
})
