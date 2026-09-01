import { h } from 'vue'
import { describe, it, expect } from 'vitest'
import { render } from '@cck-ui-tests/core'
import CCard from '../card.vue'
import CCardSection from './card-section.vue'

describe('@cck-ui/core/card-section', () => {
  it('sets data-with-border when withBorder is true', () => {
    const { wrapper } = render(CCard, {
      slots: {
        default: () => h(CCardSection, { withBorder: true }, { default: () => 'content' }),
      },
    })
    const section = wrapper.find('.c-Card-section')
    expect(section.attributes('data-with-border')).toBeDefined()
  })

  it('does not set data-with-border when withBorder is false', () => {
    const { wrapper } = render(CCard, {
      slots: {
        default: () => h(CCardSection, { withBorder: false }, { default: () => 'content' }),
      },
    })
    const section = wrapper.find('.c-Card-section')
    expect(section.attributes('data-with-border')).toBeUndefined()
  })

  it('sets data-inherit-padding when inheritPadding is true', () => {
    const { wrapper } = render(CCard, {
      slots: {
        default: () => h(CCardSection, { inheritPadding: true }, { default: () => 'content' }),
      },
    })
    const section = wrapper.find('.c-Card-section')
    expect(section.attributes('data-inherit-padding')).toBeDefined()
  })

  it('does not set data-inherit-padding when inheritPadding is false', () => {
    const { wrapper } = render(CCard, {
      slots: {
        default: () => h(CCardSection, { inheritPadding: false }, { default: () => 'content' }),
      },
    })
    const section = wrapper.find('.c-Card-section')
    expect(section.attributes('data-inherit-padding')).toBeUndefined()
  })
})
