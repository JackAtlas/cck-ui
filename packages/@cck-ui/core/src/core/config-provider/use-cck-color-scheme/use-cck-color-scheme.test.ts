import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import CckConfigProvider from '../config-provider.vue'
import { useCckColorScheme } from './use-cck-color-scheme.js'

describe('@cck-ui/core/CckConfigProvider/useCckColorScheme', () => {
  it('returns color scheme from CckConfigProvider context', () => {
    const TestComponent = defineComponent({
      setup() {
        const { colorScheme } = useCckColorScheme()
        return () => colorScheme.value
      },
    })

    const wrapper = mount({
      components: { CckConfigProvider, TestComponent },
      template: `
        <CckConfigProvider defaultColorScheme="dark">
          <TestComponent />
        </CckConfigProvider>
      `,
    })

    expect(wrapper.text()).toBe('dark')
  })

  describe('with default values', () => {
    it('returns light color scheme when no defaultColorScheme is provided', () => {
      const TestComponent = defineComponent({
        setup() {
          const { colorScheme } = useCckColorScheme()
          return () => colorScheme.value
        },
      })

      const wrapper = mount({
        components: { CckConfigProvider, TestComponent },
        template: `
          <CckConfigProvider>
            <TestComponent />
          </CckConfigProvider>
        `,
      })

      expect(wrapper.text()).toBe('light')
    })
  })
})
