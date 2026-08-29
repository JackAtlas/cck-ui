import { Meta, StoryObj } from '@storybook/vue3-vite'
import CBurger from '.'
import { ref } from 'vue'

const meta = {
  title: 'Burger',
  component: CBurger,
} satisfies Meta<typeof CBurger>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CBurger },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let burgerStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/burger.module.css')) {
          burgerStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (burgerStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, burgerStyle)
      }

      const opened = ref<boolean>(false)

      const setOpened = () => {
        opened.value = !opened.value
      }

      return { opened, setOpened }
    },
    template: `
      <c-burger :line-size="1" :opened="opened" :size="400" @click="setOpened" />
    `,
  }),
}

export const Unstyled: Story = {
  render: () => ({
    components: { CBurger },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let burgerStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/burger.module.css')) {
          burgerStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (burgerStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, burgerStyle)
      }

      const opened = ref<boolean>(false)

      const setOpened = () => {
        opened.value = !opened.value
      }

      return { opened, setOpened }
    },
    template: `
      <c-burger unstyled :line-size="1" :opened="opened" :size="400" @click="setOpened" />
    `,
  }),
}
