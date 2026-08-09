import { describe, it, expect } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import CFlex from '.'
import { FlexProps, FlexStylesNames } from './flex.types'

const defaultProps: FlexProps = {}

describe('@cck-ui/core/flex', () => {
  tests.itSupportsSystemProps<FlexProps, FlexStylesNames>({
    component: CFlex,
    props: defaultProps,
    children: true,
    name: 'CFlex',
    staticName: 'Flex',
    stylesApiSelectors: ['root'],
  })

  it('supports gap style prop', () => {
    const { wrapper } = render(CFlex, { props: { gap: '2em' } })
    const root = wrapper.find('.c-Flex-root')
    expect((root.element as HTMLElement).style.gap).toBe('2em')
  })

  it('supports rowGap style prop', () => {
    const { wrapper } = render(CFlex, { props: { rowGap: '2em' } })
    const root = wrapper.find('.c-Flex-root')
    expect((root.element as HTMLElement).style.rowGap).toBe('2em')
  })

  it('supports columnGap style prop', () => {
    const { wrapper } = render(CFlex, { props: { columnGap: '2em' } })
    const root = wrapper.find('.c-Flex-root')
    expect((root.element as HTMLElement).style.columnGap).toBe('2em')
  })

  it('supports align style prop', () => {
    const { wrapper } = render(CFlex, { props: { align: 'center' } })
    const root = wrapper.find('.c-Flex-root')
    expect((root.element as HTMLElement).style.alignItems).toBe('center')
  })

  it('supports justify style prop', () => {
    const { wrapper } = render(CFlex, { props: { justify: 'center' } })
    const root = wrapper.find('.c-Flex-root')
    expect((root.element as HTMLElement).style.justifyContent).toBe('center')
  })

  it('supports wrap style prop', () => {
    const { wrapper } = render(CFlex, { props: { wrap: 'wrap' } })
    const root = wrapper.find('.c-Flex-root')
    expect((root.element as HTMLElement).style.flexWrap).toBe('wrap')
  })

  it('supports direction style prop', () => {
    const { wrapper } = render(CFlex, { props: { direction: 'column' } })
    const root = wrapper.find('.c-Flex-root')
    expect((root.element as HTMLElement).style.flexDirection).toBe('column')
  })
})
