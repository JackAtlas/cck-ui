import { Meta, StoryObj } from '@storybook/vue3-vite'
import CCollapse from '.'
import CButton from '../button'
import { ref } from 'vue'
import CText from '../text'
import CStack from '../stack'
import CTypography from '../typography'

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

export const Horizontal: Story = {
  render: () => ({
    components: { CButton, CCollapse, CStack, CText, CTypography },
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
      <c-stack align="flex-start">
        <c-button w="fit-content" @click="toggle">{{ opened ? 'Collapse' : 'Expand' }}</c-button>

        <c-collapse orientation="horizontal" :expanded="opened">
          <c-typography bg="var(--c-color-blue-light)" bdrs="md" p="xs" :w="200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </c-typography>
        </c-collapse>
      </c-stack>
    `,
  }),
}
