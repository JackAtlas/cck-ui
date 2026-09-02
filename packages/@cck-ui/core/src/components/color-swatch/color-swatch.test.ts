import { describe, expect, it } from 'vitest'
import { ColorSwatchProps, ColorSwatchStylesNames } from './color-swatch.types'
import { render, tests } from '@cck-ui-tests/core'
import { h } from 'vue'
import CColorSwatch from '.'

const defaultProps: ColorSwatchProps = {
  color: '#000',
  withShadow: true,
}

const defaultSlots = {
  default: () => '$$',
}

describe('@cck-ui/core/color-swatch', () => {
  tests.axe([
    h(CColorSwatch, {
      'aria-label': 'test-color',
      color: '#000',
      key: '1',
      tag: 'button',
      type: 'button',
    }),
    h(
      CColorSwatch,
      {
        color: '#000',
        key: '2',
        tag: 'button',
        type: 'button',
      },
      () => 'test-color'
    ),
  ])

  tests.itSupportsSystemProps<ColorSwatchProps, ColorSwatchStylesNames>({
    component: CColorSwatch,
    props: defaultProps,
    slots: defaultSlots,
    varsResolver: true,
    polymorphic: true,
    children: true,
    name: 'CColorSwatch',
    staticName: 'ColorSwatch',
    stylesApiSelectors: [
      'root',
      'alphaOverlay',
      'childrenOverlay',
      'colorOverlay',
      'shadowOverlay',
    ],
  })

  it('renders shadow overlay only when withShadow is true', async () => {
    const { wrapper, rerender } = render(CColorSwatch, {
      props: { ...defaultProps, withShadow: false },
      slots: defaultSlots,
    })

    let shadow = wrapper.find('.c-ColorSwatch-shadowOverlay')
    expect(shadow.exists()).toBeFalsy()

    await rerender({ props: defaultProps, slots: defaultSlots })
    shadow = wrapper.find('.c-ColorSwatch-shadowOverlay')
    expect(shadow.exists()).toBeTruthy()
  })
})
