import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useRandomClassName } from './use-random-classname'

describe('@cck-ui/core/Box/use-random-classname', () => {
  it('returns random classname', () => {
    const TestComponent = defineComponent({
      setup() {
        const className = useRandomClassName()
        return { className }
      },
      template: '<div>{{ className }}</div>',
    })

    const wrapper = mount(TestComponent)
    const className = wrapper.text()

    expect(className).toMatch(/^__c__-v-[a-z0-9]+$/)
  })
})
