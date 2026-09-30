import { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { useClickOutside } from './use-click-outside'

const meta = {
  title: 'use-click-outside',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    setup() {
      const visible = ref(false)
      const toggle = () => {
        visible.value = !visible.value
      }

      const divRef = useClickOutside(() => console.log('clicked outside'))

      return { divRef, toggle, visible }
    },
    template: `
      <div style="padding: 40px">
        <div style="padding: 40px; background: orange;" v-if="visible" ref="divRef">Click outside</div>

        <button @click="toggle">Toggle visible</button>
      </div>
    `,
  }),
}
