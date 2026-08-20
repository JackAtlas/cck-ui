import { Meta, StoryObj } from '@storybook/vue3-vite'
import CButton from '../button'
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
    components: { CButton, CCopyButton },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      return { args }
    },
    template: `
      <c-copy-button :timeout="1000" :value="args.value">
        <template #default="{ copied, copy }">
          <c-button variant="filled" :color="copied ? 'teal' : 'blue'" @click="copy">{{ copied ? 'Copied to clipboard' : 'Copy to clipboard' }}</c-button>
        </template>
      </c-copy-button>
    `,
  }),
}
