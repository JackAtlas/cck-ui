import { describe, it, expect } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import CPaper from '.'
import { PaperProps, PaperStylesNames } from './paper.types'

const defaultProps: PaperProps = {}

describe('@cck-ui/core/paper', () => {
  tests.itSupportsSystemProps<PaperProps, PaperStylesNames>({
    component: CPaper,
    props: defaultProps,
    slots: { default: () => 'test-children' },
    varsResolver: true,
    polymorphic: true,
    children: true,
    name: 'CPaper',
    staticName: 'Paper',
    stylesApiSelectors: ['root'],
  })

  it('sets data-with-border attribute when withBorder props is set', async () => {
    const { wrapper, rerender } = render(CPaper, {
      props: { withBorder: true },
    })

    let root = wrapper.find('.c-Paper-root')
    expect(root.attributes('data-with-border')).toBeDefined()

    await rerender({ withBorder: false })
    root = wrapper.find('.c-Paper-root')
    expect(root.attributes('data-with-border')).toBeUndefined()
  })
})
