import { describe, it, expect } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import CButton, { CButtonGroup } from '..'
import { ButtonGroupProps, ButtonGroupStylesNames } from './button-group.types'
import { h } from 'vue'

const defaultProps: ButtonGroupProps = {}

describe('@cck-ui/core/button-group', () => {
  tests.itSupportsSystemProps<ButtonGroupProps, ButtonGroupStylesNames>({
    component: CButtonGroup,
    props: defaultProps,
    varsResolver: true,
    children: false,
    name: 'CButtonGroup',
    staticName: 'ButtonGroup',
    stylesApiSelectors: ['group'],
    refProp: 'group',
    slots: {
      default: () => [h(CButton, {}, () => 'Button 1'), h(CButton, {}, () => 'Button 2')],
    },
  })

  it('renders children', () => {
    const { wrapper } = render(CButtonGroup, {
      props: defaultProps,
      slots: {
        default: () => [h(CButton, {}, () => 'Button 1'), h(CButton, {}, () => 'Button 2')],
      },
    })

    expect(wrapper.text()).toContain('Button 1')
    expect(wrapper.text()).toContain('Button 2')
  })

  it('adds data-orientation attribute to root element based on orientation prop', () => {
    const { wrapper } = render(CButtonGroup, {
      props: { orientation: 'vertical' },
    })

    const root = wrapper.find('[role="group"]')
    expect(root.attributes('data-orientation')).toBe('vertical')
  })
})
