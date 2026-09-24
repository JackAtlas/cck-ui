import { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { useLongPress } from './use-long-press'

const meta = {
  title: 'useLongPress',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    setup() {
      const state = ref<string>('idle')
      const handlers = useLongPress(() => (state.value = 'long pressed!'), {
        threshold: 500,
        onStart: () => (state.value = 'pressing...'),
        onCancel: () => (state.value = 'cancelled'),
        onFinish: () => (state.value = 'finished'),
      })

      return { handlers, state }
    },
    template: `
      <div style="padding: 40px;">
        <button v-bind="handlers" :style="{
          padding: '16px 32px',
          fontSize: 16,
          cursor: 'pointer',
          background: state === 'long pressed!' ? '#40c057' : state === 'pressing...' ? '#fab005' : '#228be6',
          color: 'white',
          border: 'none',
          borderRadius: 8
        }">Hold me (500ms)</button>
        <p>State: <strong>{{ state }}</strong></p>
      </div>
    `,
  }),
}
