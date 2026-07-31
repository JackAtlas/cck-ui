import { describe, it, expect } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import CUnstyledButton from '.'
import { UnstyledButtonProps, UnstyledButtonStylesNames } from './unstyled-button.types'

const defaultProps: UnstyledButtonProps = {}

describe('@cck-ui/core/unstyled-button', () => {
  tests.axe([
    {
      component: CUnstyledButton,
      options: { props: { 'aria-label': 'test' } },
    },
    {
      component: CUnstyledButton,
      options: { slots: { default: () => 'test' } },
    },
  ])

  tests.itSupportsFocusEvent({
    component: CUnstyledButton,
    props: defaultProps,
  })

  tests.itSupportsSystemProps<UnstyledButtonProps, UnstyledButtonStylesNames>({
    component: CUnstyledButton,
    props: defaultProps,
    polymorphic: true,
    children: true,
    name: 'UnstyledButton',
    staticName: 'UnstyledButton',
    stylesApiSelectors: ['root'],
  })

  it('adds type="button" to root element if tag is button', () => {
    const { wrapper: buttonWrapper } = render(CUnstyledButton, {
      props: { tag: 'button' },
    })
    const button = buttonWrapper.find('button')
    expect(button.attributes('type')).toBe('button')

    const { wrapper: divWrapper } = render(CUnstyledButton, {
      props: { tag: 'div' },
    })
    const div = divWrapper.find('div')
    expect(div.attributes('type')).toBeUndefined()
  })
})
