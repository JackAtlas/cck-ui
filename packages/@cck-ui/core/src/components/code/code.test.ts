import { render, tests } from '@cck-ui-tests/core'
import { describe, expect, it } from 'vitest'
import { CodeProps, CodeStylesNames } from './code.types'
import CCode from '.'

describe('@cck-ui/core/code', () => {
  tests.itSupportsSystemProps<CodeProps, CodeStylesNames>({
    component: CCode,
    props: {},
    varsResolver: true,
    children: true,
    name: 'CCode',
    staticName: 'Code',
    stylesApiSelectors: ['root'],
  })
})

it('renders code element for inline code', () => {
  const { wrapper } = render(CCode, { slots: { default: () => 'inline-code' } })

  const root = wrapper.find('.c-Code-root')
  expect(root.element.nodeName).toBe('CODE')
  expect(root.text()).contains('inline-code')
})

it('renders pre element for block', () => {
  const { wrapper } = render(CCode, {
    props: { block: true },
    slots: { default: () => 'block-code' },
  })

  const root = wrapper.find('.c-Code-root')
  expect(root.element.nodeName).toBe('PRE')
  expect(root.text()).contains('block-code')
})
