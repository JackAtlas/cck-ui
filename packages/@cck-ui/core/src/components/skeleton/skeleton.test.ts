import { describe, it, expect } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import CSkeleton from '.'
import { SkeletonProps, SkeletonStylesNames } from './skeleton.types'

const defaultProps: SkeletonProps = {}

describe('@cck-ui/core/skeleton', () => {
  tests.itSupportsSystemProps<SkeletonProps, SkeletonStylesNames>({
    component: CSkeleton,
    props: defaultProps,
    slots: { default: () => 'test-children' },
    varsResolver: true,
    children: true,
    name: 'CSkeleton',
    staticName: 'Skeleton',
    stylesApiSelectors: ['root'],
  })

  it('sets data-visible attribute based on visible prop', async () => {
    const { wrapper, rerender } = render(CSkeleton, {
      props: { visible: false },
    })

    let root = wrapper.find('.c-Skeleton-root')
    expect(root.attributes('data-visible')).toBeUndefined()

    await rerender({ props: { visible: true } })
    root = wrapper.find('.c-Skeleton-root')
    expect(root.attributes('data-visible')).toBeDefined()
  })

  it('sets data-animate attribute based on animate prop', async () => {
    const { wrapper, rerender } = render(CSkeleton, {
      props: { animate: false },
    })

    let root = wrapper.find('.c-Skeleton-root')
    expect(root.attributes('data-animate')).toBeUndefined()

    await rerender({ props: { animate: true } })
    root = wrapper.find('.c-Skeleton-root')
    expect(root.attributes('data-animate')).toBeDefined()
  })
})
