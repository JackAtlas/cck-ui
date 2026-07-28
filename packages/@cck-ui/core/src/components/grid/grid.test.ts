import { render, tests } from '@cck-ui-tests/core'
import { describe, expect, it } from 'vitest'
import { GridProps, GridStylesNames } from './grid.types'
import CGrid, { CCol } from '.'
import { h } from 'vue'

const defaultProps: GridProps = {}

describe('@cck-ui/core/grid', () => {
  tests.itSupportsSystemProps<GridProps, GridStylesNames>({
    component: CGrid,
    props: defaultProps,
    varsResolver: true,
    children: true,
    name: 'CGrid',
    staticName: 'Grid',
    stylesApiSelectors: ['root', 'inner', 'col'],
    slots: {
      default: () => h(CGrid.Col, { span: 12 }, () => 'test'),
    },
  })

  it('exposes Grid.Col component', () => {
    expect(CGrid.Col).toBe(CCol)
  })

  it('renders container element when type="container" with breakpoints', () => {
    const { wrapper } = render(CGrid, {
      props: {
        type: 'container',
        breakpoints: { xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' },
      },
      slots: {
        default: () => h(CCol, { span: 12 }, () => 'test'),
      },
    })

    const container = wrapper.find('.c-Grid-container')
    expect(container.exists()).toBe(true)
  })

  it('does not render container element when type="media"', () => {
    const { wrapper } = render(CGrid, {
      props: { type: 'media' },
      slots: {
        default: () => h(CCol, { span: 12 }, () => 'test'),
      },
    })

    const container = wrapper.find('.c-Grid-container')
    expect(container.exists()).toBe(false)
  })

  it('does not render container element when type="container" without breakpoints', () => {
    const { wrapper } = render(CGrid, {
      props: {
        type: 'container',
      },
      slots: {
        default: () => h(CCol, { span: 12 }, () => 'test'),
      },
    })

    const container = wrapper.find('.c-Grid-container')
    expect(container.exists()).toBe(false)
  })

  it('applies justify prop correctly', () => {
    const { wrapper } = render(CGrid, {
      props: { justify: 'center' },
      slots: {
        default: () => h(CCol, { span: 12 }, () => 'test'),
      },
    })

    const root = wrapper.find('.c-Grid-root')
    expect(root.attributes('style')).toContain('--grid-justify: center')
  })

  it('applies align prop correctly', () => {
    const { wrapper } = render(CGrid, {
      props: { align: 'flex-end' },
      slots: {
        default: () => h(CCol, { span: 12 }, () => 'test'),
      },
    })

    const root = wrapper.find('.c-Grid-root')
    expect(root.attributes('style')).toContain('--grid-align: flex-end')
  })

  it('applies overflow prop correctly', () => {
    const { wrapper } = render(CGrid, {
      props: { overflow: 'hidden' },
      slots: {
        default: () => h(CCol, { span: 12 }, () => 'test'),
      },
    })

    const root = wrapper.find('.c-Grid-root')
    expect(root.attributes('style')).toContain('--grid-overflow: hidden')
  })
})
