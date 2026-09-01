import { h } from 'vue'
import { CardProps, CardStylesNames } from './card.types'
import CCard, { CCardSection } from '.'
import { describe, expect, it } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'

const defaultSlots = {
  default: () =>
    h(
      CCardSection,
      {},
      {
        default: () => 'content',
      }
    ),
}

describe('@cck-ui/core/card', () => {
  tests.itSupportsSystemProps<CardProps, CardStylesNames>({
    component: CCard,
    props: {},
    slots: defaultSlots,
    varsResolver: true,
    polymorphic: true,
    children: true,
    name: 'CCard',
    staticName: 'Card',
    stylesApiSelectors: ['root', 'section'],
  })

  it('sets data-first-section and data-last-section props to first and last CardSection components', () => {
    const { wrapper } = render(CCard, {
      slots: {
        default: () => [
          h(CCardSection, {}, () => 'content'),
          h('div', {}, () => 'content'),
          h(CCardSection, {}, () => 'content'),
          h('div', {}, () => 'content'),
          h(CCardSection, {}, () => 'content'),
        ],
      },
    })

    const sections = wrapper.findAll('.c-Card-section')
    expect(sections[0].attributes('data-first-section')).toBeDefined()
    expect(sections[0].attributes('data-last-section')).toBeUndefined()

    expect(sections[1].attributes('data-first-section')).toBeUndefined()
    expect(sections[1].attributes('data-last-section')).toBeUndefined()

    expect(sections[2].attributes('data-first-section')).toBeUndefined()
    expect(sections[2].attributes('data-last-section')).toBeDefined()
  })

  it('assigns data-orientation attribute based on orientation prop on root and sections', () => {
    const { wrapper } = render(CCard, {
      props: { orientation: 'horizontal' },
      slots: {
        default: () => [h(CCardSection), h('div', {}, () => 'content'), h(CCardSection)],
      },
    })

    const root = wrapper.find('.c-Card-root')
    const sections = wrapper.findAll('.c-Card-section')

    expect(root.attributes('data-orientation')).toBe('horizontal')
    sections.forEach((section) => {
      expect(section.attributes('data-orientation')).toBe('horizontal')
    })
  })
})
