import { Meta, StoryObj } from '@storybook/vue3-vite'
import CVisuallyHidden from '.'
import CActionIcon from '../action-icon'

const meta = {
  title: 'VisuallyHidden',
  component: CVisuallyHidden,
} satisfies Meta<typeof CVisuallyHidden>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CActionIcon, CVisuallyHidden },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let actionIconStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/action-icon.module.css')) {
          actionIconStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (actionIconStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, actionIconStyle)
      }
    },
    template: `
      <div style="padding: 40px;">
        <c-action-icon>
          <c-visually-hidden>Pronounce this</c-visually-hidden>
          $$
        </c-action-icon>
      </div>
    `,
  }),
}
