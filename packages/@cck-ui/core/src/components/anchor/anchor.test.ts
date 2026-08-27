import { describe, expect, it } from 'vitest'
import { AnchorProps, AnchorStylesNames } from './anchor.types'
import { render, tests } from '@cck-ui-tests/core'
import CAnchor from '.'

const defaultProps: AnchorProps = {}

describe('@cck-ui/core/anchor', () => {
  tests.itSupportsSystemProps<AnchorProps, AnchorStylesNames>({
    component: CAnchor,
    props: defaultProps,
    polymorphic: true,
    children: true,
    name: 'CAnchor',
    staticName: 'Anchor',
    stylesApiSelectors: ['root'],
  })

  it('sets data-underline attribute based on underline prop', async () => {
    const { wrapper, rerender } = render(CAnchor, {
      props: { underline: 'always' },
      attrs: { 'data-test': 'true' },
    })
    let root = wrapper.find('.c-Anchor-root')
    expect(root.attributes('data-test')).toBeDefined()
    expect(root.attributes('data-underline')).toBe('always')

    await rerender({ props: { underline: 'hover' } })
    root = wrapper.find('.c-Anchor-root')
    expect(root.attributes('data-underline')).toBe('hover')

    await rerender({ props: { underline: 'never' } })
    root = wrapper.find('.c-Anchor-root')
    expect(root.attributes('data-underline')).toBe('never')

    await rerender({ props: { underline: undefined } })
    root = wrapper.find('.c-Anchor-root')
    expect(root.attributes('data-underline')).toBe('hover')
  })
})
