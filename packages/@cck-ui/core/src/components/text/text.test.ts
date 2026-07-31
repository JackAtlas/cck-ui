import { describe, it, expect } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import CText from '.'
import { TextProps, TextStylesNames } from './text.types'

const defaultProps: TextProps = {}

describe('@cck-ui/core/text', () => {
  tests.itSupportsSystemProps<TextProps, TextStylesNames>({
    component: CText,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    children: true,
    name: 'CText',
    staticName: 'Text',
    stylesApiSelectors: ['root'],
  })

  it('sets data-truncate attribute based on truncate prop', async () => {
    const { wrapper, rerender } = render(CText, {
      props: { truncate: 'start' },
      slots: { default: () => 'text' },
    })

    let root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-truncate')).toBe('start')

    await rerender({ truncate: 'end' })
    root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-truncate')).toBe('end')

    await rerender({ truncate: true as any })
    root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-truncate')).toBe('end')

    await rerender({ truncate: false as any })
    root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-truncate')).toBeUndefined()
  })

  it('sets data-variant attribute based on variant prop', async () => {
    const { wrapper, rerender } = render(CText, {
      props: { variant: 'text' },
      slots: { default: () => 'text' },
    })

    let root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-variant')).toBe('text')

    await rerender({ variant: 'gradient' })
    root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-variant')).toBe('gradient')
  })

  it('sets data-inline attribute based on inline prop', async () => {
    const { wrapper, rerender } = render(CText, {
      props: { inline: true },
      slots: { default: () => 'text' },
    })

    let root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-inline')).toBeDefined()

    await rerender({ inline: false })
    root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-inline')).toBeUndefined()
  })

  it('sets data-inherit attribute based on inherit prop', async () => {
    const { wrapper, rerender } = render(CText, {
      props: { inherit: true },
      slots: { default: () => 'text' },
    })

    let root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-inherit')).toBeDefined()

    await rerender({ inherit: false })
    root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-inherit')).toBeUndefined()
  })

  it('sets data-line-clamp attribute based on lineClamp prop', async () => {
    const { wrapper, rerender } = render(CText, {
      props: { lineClamp: 3 },
      slots: { default: () => 'text' },
    })

    let root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-line-clamp')).toBeDefined()

    await rerender({ lineClamp: undefined })
    root = wrapper.find('.c-Text-root')
    expect(root.attributes('data-line-clamp')).toBeUndefined()
  })

  it('changes root element to span if span prop is set', () => {
    const { wrapper } = render(CText, {
      props: { span: true },
      slots: { default: () => 'text' },
    })

    const root = wrapper.find('.c-Text-root')
    expect(root.element.tagName.toLowerCase()).toBe('span')
  })
})
