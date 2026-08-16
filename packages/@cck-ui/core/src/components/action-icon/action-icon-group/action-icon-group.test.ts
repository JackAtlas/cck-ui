import { describe, expect, it } from 'vitest'
import { ActionIconGroupProps, ActionIconGroupStylesNames } from './action-icon-group.types'
import { render, tests } from '@cck-ui-tests/core'
import { CActionIconGroup } from '..'

const defaultProps: ActionIconGroupProps = {}

describe('@cck-ui/core/action-icon-group', () => {
  tests.itSupportsSystemProps<ActionIconGroupProps, ActionIconGroupStylesNames>({
    component: CActionIconGroup,
    props: defaultProps,
    varsResolver: true,
    children: true,
    staticName: 'ActionIconGroup',
    stylesApiSelectors: ['group'],
    refProp: 'group',
  })

  it('adds data-orientation attribute to root element based on orientation prop', () => {
    const { wrapper } = render(CActionIconGroup, {
      props: { orientation: 'vertical' },
    })

    const root = wrapper.find('[role="group"]')
    expect(root.attributes('data-orientation')).toBe('vertical')
  })
})
