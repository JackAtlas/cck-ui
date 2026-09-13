import { Meta, StoryObj } from '@storybook/vue3-vite'
import CCollapse from '.'
import CButton from '../button'
import { ref } from 'vue'
import CText from '../text'

const meta = {
  title: 'Collapse',
  component: CCollapse,
  args: {
    expanded: false,
  },
} satisfies Meta<typeof CCollapse>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CButton, CCollapse, CText },
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

      const opened = ref(false)
      const toggle = () => {
        opened.value = !opened.value
      }
      return { opened, toggle }
    },
    template: `
      <div style="max-width: 400px; background: pink;">
        <c-button mb="md" @click="toggle">Toggle content</c-button>

        <c-collapse :expanded="opened" :keep-mounted="false">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          </p>
        </c-collapse>
      </div>
    `,
  }),
}
