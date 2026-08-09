import { Meta, StoryObj } from '@storybook/vue3-vite'
import { CFlex } from '.'
import { CButton } from '..'

const meta = {
  title: 'Flex',
  component: CFlex,
  render: () => ({}),
} satisfies Meta<typeof CFlex>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CButton, CFlex },
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
    },
    template: `
      <div style="padding: 40px">
        <c-flex :mih="50" bg="rgba(0, 0, 0, .3)" gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
          <c-button>Button 1</c-button>
          <c-button>Button 2</c-button>
          <c-button>Button 3</c-button>
        </c-flex>
      </div>
    `,
  }),
}

export const Responsive: Story = {
  render: () => ({
    components: { CButton, CFlex },
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
    },
    template: `
      <div style="padding: 40px">
        <c-flex
          :direction="{ base: 'column', sm: 'row' }"
          :gap="{ base: 'sm', sm: 'lg' }"
          :justify="{ sm: 'center' }"
        >
          <c-button>Button 1</c-button>
          <c-button>Button 2</c-button>
          <c-button>Button 3</c-button>
        </c-flex>
      </div>
    `,
  }),
}
