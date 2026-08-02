import { describe, expect, it } from 'vitest'
import { ContainerProps, ContainerStylesNames } from './container.types'
import { render, tests } from '@cck-ui-tests/core'
import CContainer from '.'

const defaultProps: ContainerProps = {}

describe('@cck-ui/core/Container', () => {
  tests.itSupportsSystemProps<ContainerProps, ContainerStylesNames>({
    component: CContainer,
    props: defaultProps,
    varsResolver: true,
    children: true,
    name: 'CContainer',
    staticName: 'Container',
    stylesApiSelectors: ['root'],
  })

  it('assigns data-strategy attribute based on strategy prop', async () => {
    const { wrapper, rerender } = render(CContainer, {
      props: { strategy: 'block' },
    })

    let root = wrapper.find('.c-Container-root')
    expect(root.attributes('data-strategy')).toBe('block')

    await rerender({ strategy: 'grid' })
    root = wrapper.find('.c-Container-root')
    expect(root.attributes('data-strategy')).toBe('grid')
  })

  it('assign data-filled attribute when fluid is true', async () => {
    const { wrapper, rerender } = render(CContainer, {
      props: { fluid: true },
    })

    let root = wrapper.find('.c-Container-root')
    expect(root.attributes('data-fluid')).toBe('true')

    await rerender({ fluid: false })
    root = wrapper.find('.c-Container-root')
    expect(root.attributes('data-fluid')).toBeUndefined()
  })
})
