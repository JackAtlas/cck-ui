import { renderWithAct, tests } from '@cck-ui-tests/core'
import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import { BreadcrumbsProps, BreadcrumbsStylesNames } from './breadcrumbs.types'
import CBreadcrumbs from '.'

const defaultSlots = {
  default: () => [h('div', { key: 1 }, '1'), h('div', { key: 2 }, '2'), h('div', { key: 3 }, '3')],
}

describe('@cck-ui/core/breadcrumbs', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  tests.itSupportsSystemProps<BreadcrumbsProps, BreadcrumbsStylesNames>({
    component: CBreadcrumbs,
    props: {},
    slots: defaultSlots,
    varsResolver: true,
    children: true,
    name: 'CBreadcrumbs',
    staticName: 'Breadcrumbs',
    stylesApiSelectors: ['breadcrumb', 'root', 'separator'],
  })

  it('renders correct amount of children and separators', async () => {
    await renderWithAct(CBreadcrumbs, {
      slots: {
        default: () => [
          h('div', { key: 1, 'data-testid': 'breadcrumb-item' }, '1'),
          h('div', { key: 2, 'data-testid': 'breadcrumb-item' }, '2'),
          h('div', { key: 3, 'data-testid': 'breadcrumb-item' }, '3'),
        ],
      },
    })
    const items = document.querySelectorAll('[data-testid="breadcrumb-item"]')
    expect(items).toHaveLength(3)
  })

  it('accepts separator from props', async () => {
    await renderWithAct(CBreadcrumbs, {
      props: { separator: 'test-separator' },
      slots: {
        default: () => [
          h('div', { key: 1 }, '1'),
          h('div', { key: 2 }, '2'),
          h('div', { key: 3 }, '3'),
        ],
      },
    })
    const separatorElements = document.querySelectorAll('.c-Breadcrumbs-separator')
    expect(separatorElements).toHaveLength(2)
    separatorElements.forEach((el) => {
      expect(el.textContent).toBe('test-separator')
    })
  })

  it('allows to set child className', async () => {
    await renderWithAct(CBreadcrumbs, {
      slots: {
        default: () => [h('button', { class: 'test-class', key: 1 }, 'test-label')],
      },
    })
    const button = document.querySelector('button.test-class')
    expect(button).toBeTruthy()
    expect(button?.textContent).toBe('test-label')
    expect(button?.classList.contains('c-Breadcrumbs-breadcrumb')).toBe(true)
  })
})
