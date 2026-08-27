import { Meta, StoryObj } from '@storybook/vue3-vite'
import CAnchor from '.'

const meta = {
  title: 'Anchor',
  component: CAnchor,
} satisfies Meta<typeof CAnchor>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CAnchor },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let anchorStyle: HTMLStyleElement | null = null
      let textStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/anchor.module.css')) {
          anchorStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/text.module.css')) {
          textStyle = style
        }
      })

      if (anchorStyle && textStyle) {
        head.insertBefore(textStyle, anchorStyle)
      }
    },
    template: `
      <div style="padding: 40px;">
        <c-anchor href="https://cck-ui.jackatlas.xyz" target="blank" underline="never">CCK UI website link: never</c-anchor>
        <br />
        <c-anchor href="https://cck-ui.jackatlas.xyz" target="blank">CCK UI website link: hover</c-anchor>
        <br />
        <c-anchor href="https://cck-ui.jackatlas.xyz" target="blank" underline="not-hover">CCK UI website link: not-hover</c-anchor>
        <br />
        <c-anchor href="https://cck-ui.jackatlas.xyz" target="blank" underline="always">CCK UI website link: always</c-anchor>
        <br />
        <c-anchor fw="bold" href="https://cck-ui.jackatlas.xyz" target="blank" underline="never" variant="gradient" :fz="60">CCK UI website link: never</c-anchor>
      </div>
    `,
  }),
}

export const Unstyled: Story = {
  render: () => ({
    components: { CAnchor },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let anchorStyle: HTMLStyleElement | null = null
      let textStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/anchor.module.css')) {
          anchorStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/text.module.css')) {
          textStyle = style
        }
      })

      if (anchorStyle && textStyle) {
        head.insertBefore(textStyle, anchorStyle)
      }
    },
    template: `
        <c-anchor href="#" unstyled>Unstyled</c-anchor>
    `,
  }),
}

export const LineClamp: Story = {
  render: () => ({
    components: { CAnchor },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let anchorStyle: HTMLStyleElement | null = null
      let textStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/anchor.module.css')) {
          anchorStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/text.module.css')) {
          textStyle = style
        }
      })

      if (anchorStyle && textStyle) {
        head.insertBefore(textStyle, anchorStyle)
      }
    },
    template: `
        <c-anchor href="#" :line-clamp="1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam non ipsum aliquid
          voluptatibus. Repellat, illo cumque a inventore excepturi dolorem? Asperiores quasi numquam
          natus ipsum rerum architecto cumque quo ut.
        </c-anchor>
    `,
  }),
}
