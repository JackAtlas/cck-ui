import { render, tests } from '@cck-ui-tests/core'
import { describe, expect, it } from 'vitest'
import { OverlayProps, OverlayStylesNames } from './overlay.types'
import COverlay from '.'

describe('@cck-ui/core/overlay', () => {
  tests.itSupportsSystemProps<OverlayProps, OverlayStylesNames>({
    component: COverlay,
    props: {},
    varsResolver: true,
    polymorphic: true,
    children: true,
    name: 'COverlay',
    staticName: 'Overlay',
    stylesApiSelectors: ['root'],
  })

  it('sets data-fixed attribute based on fixed prop', () => {
    const props = { fixed: true } satisfies OverlayProps
    const { wrapper } = render(COverlay, { props, slots: { default: () => 'test' } })

    expect(wrapper.find('.c-Overlay-root').attributes('data-fixed')).toBeDefined()
  })

  it('sets data-center attribute based on center prop', () => {
    const props = { center: true } satisfies OverlayProps
    const { wrapper } = render(COverlay, { props, slots: { default: () => 'test' } })

    expect(wrapper.find('.c-Overlay-root').attributes('data-center')).toBeDefined()
  })
})
