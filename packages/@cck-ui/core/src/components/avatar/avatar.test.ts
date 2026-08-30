import { describe, expect, it } from 'vitest'
import { AvatarProps, AvatarStylesNames } from './avatar.types'
import { render, tests } from '@cck-ui-tests/core'
import { h } from 'vue'
import CAvatar, { CAvatarGroup } from '.'

const defaultProps: AvatarProps = {}

describe('@cck-ui/core/avatar', () => {
  tests.axe([
    { component: CAvatar, options: { props: { alt: 'test', src: 'test.png' } } },
    { component: CAvatar, options: { props: { alt: 'test' } } },
  ])

  tests.itSupportsSystemProps<AvatarProps, AvatarStylesNames>({
    component: CAvatar,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    children: true,
    name: 'CAvatar',
    staticName: 'Avatar',
    stylesApiSelectors: ['root', 'placeholder'],
  })

  it('sets data-within-group attribute when Avatar is rendered inside AvatarGroup', () => {
    const { wrapper } = render(CAvatarGroup, {
      slots: {
        default: () => h(CAvatar),
      },
    })

    const root = wrapper.find('.c-Avatar-root')
    expect(root.attributes('data-within-group')).toBeDefined()

    const { wrapper: wrapper2 } = render(CAvatar)

    const root2 = wrapper2.find('.c-Avatar-root')
    expect(root2.attributes('data-within-group')).toBeUndefined()
  })

  it('renders placeholder if src was not set', async () => {
    const { wrapper, rerender } = render(CAvatar)

    let placeholder = wrapper.find('.c-Avatar-placeholder')
    expect(placeholder.exists()).toBeTruthy()

    await rerender({ props: { src: 'image.png' } })
    placeholder = wrapper.find('.c-Avatar-placeholder')
    expect(placeholder.exists()).toBeFalsy()

    await rerender({ props: { src: '' } })
    placeholder = wrapper.find('.c-Avatar-placeholder')
    expect(placeholder.exists()).toBeTruthy()
  })

  it('sets image src and alt attributes based on props', () => {
    const { wrapper } = render(CAvatar, { props: { src: 'image.png', alt: 'test-alt' } })

    const image = wrapper.find('img')
    expect(image.attributes('src')).toBe('image.png')
    expect(image.attributes('alt')).toBe('test-alt')
  })

  it('displays placeholder if image failed to load', async () => {
    const { wrapper } = render(CAvatar, { props: { src: 'image.png', alt: 'test-alt' } })

    let placeholder = wrapper.find('.c-Avatar-placeholder')
    expect(placeholder.exists()).toBeFalsy()

    const img = wrapper.find('img')
    await img.trigger('error')

    placeholder = wrapper.find('.c-Avatar-placeholder')
    expect(placeholder.exists()).toBeTruthy()
  })

  it('passes down imageProps to img element', () => {
    const { wrapper } = render(CAvatar, {
      props: { src: 'image.png', alt: 'test-alt', imageProps: { 'aria-label': 'test-label' } },
    })

    const image = wrapper.find('img')
    expect(image.attributes('aria-label')).toBe('test-label')
  })
})
