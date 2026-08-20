import { Meta, StoryObj } from '@storybook/vue3-vite'
import CCopyButton from '.'

const meta = {
  title: 'CopyButton',
  component: CCopyButton,
  render: (args) => ({
    setup() {
      return { args }
    },
  }),
} satisfies Meta<typeof CCopyButton>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  args: {
    value: 'cck-ui',
  },
  render: (args) => ({
    components: { CCopyButton },
    setup() {
      return { args }
    },
    template: `
      <c-copy-button :timeout="1000" :value="args.value">
        <template #default="{ copied, copy }">
          <button type="button" :style="{ color: copied ? 'teal' : 'blue' }" @click="copy">{{ copied ? 'Copied to clipboard' : 'Copy to clipboard' }}</button>
        </template>
      </c-copy-button>
    `,
  }),
}
