import { describe, expect, it } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import { CloseButtonProps, CloseButtonStylesNames } from './close-button.types'
import CCloseButton from '.'
import CloseIcon from './close-icon.vue'
import { h } from 'vue'

const defaultProps: CloseButtonProps = {}

describe('@cck-ui/core/close-button', () => {
  tests.axe([
    {
      component: CCloseButton,
      options: {
        props: {
          'aria-label': 'test',
        },
      },
    },
  ])

  tests.itSupportsFocusEvent({
    component: CCloseButton,
    props: defaultProps,
  })

  tests.itSupportsSystemProps<CloseButtonProps, CloseButtonStylesNames>({
    component: CCloseButton,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    children: true,
    name: 'CCloseButton',
    staticName: 'CloseButton',
    stylesApiSelectors: ['root'],
  })

  it('allows rendering custom icon via slot', () => {
    const { wrapper } = render(CCloseButton, {
      props: { 'aria-label': 'test' },
      slots: {
        icon: () => h('span', { 'data-test-id': 'test-icon' }, '✕'),
      },
    })

    expect(wrapper.find('[data-test-id="test-icon"]').exists()).toBe(true)
  })
})

describe('@cck-ui/core/close-icon', () => {
  tests.itSupportsRef({
    component: CloseIcon,
    props: {},
    refType: SVGElement,
    refProp: 'root',
  })

  it('sets width and height to size prop', () => {
    const { wrapper } = render(CloseIcon, {
      props: { size: '10%' },
    })

    const svg = wrapper.find('svg')
    expect(svg.attributes('style')).toContain('width: 10%; height: 10%')
  })
})
