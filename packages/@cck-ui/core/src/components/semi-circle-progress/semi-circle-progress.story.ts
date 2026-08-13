import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CSemiCircleProgress from '.'

const meta = {
  title: 'SemiCircleProgress',
  component: CSemiCircleProgress,
  render: (args) => ({
    components: { CSemiCircleProgress },
    setup() {
      return { args }
    },
    template: `<c-semi-circle-progress :value="40" />`,
  }),
} satisfies Meta<typeof CSemiCircleProgress>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  args: {
    value: 40,
  },
  render: (args) => ({
    components: { CSemiCircleProgress },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px;">
        <c-semi-circle-progress :value="args.value">
          <template #label>{{ args.value }}%</template>
        </c-semi-circle-progress>
      </div>
    `,
  }),
}

export const ZeroValue: Story = {
  args: {
    value: 0,
  },
  render: () => ({
    components: { CSemiCircleProgress },
    setup() {
      const configs = [
        { value: 40, label: '0 up ltr', orientation: 'up', fillDirection: 'left-to-right' },
        { value: 40, label: '0 up rtl', orientation: 'up', fillDirection: 'right-to-left' },
        { value: 40, label: '0 down ltr', orientation: 'down', fillDirection: 'left-to-right' },
        { value: 40, label: '0 down rtl', orientation: 'down', fillDirection: 'right-to-left' },
      ]
      return { configs }
    },
    template: `
      <div style="padding: 40px; display: flex; gap: 40px; flex-wrap: wrap;">
        <c-semi-circle-progress
          v-for="config in configs"
          :key="config.label"
          :value="config.value"
          :orientation="config.orientation"
          :fill-direction="config.fillDirection"
        >
          <template #label>{{ config.label }}</template>
        </c-semi-circle-progress>
      </div>
    `,
  }),
}
