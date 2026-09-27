import { Meta, StoryObj } from '@storybook/vue3-vite'
import COverlay from '.'
import CText from '../text'

const lorem =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus ratione expedita voluptatibus aperiam cum, consectetur, tenetur consequuntur error qui eum eligendi, ea illum! Sit, sint totam dicta rem deleniti perspiciatis!'

const meta = {
  title: 'Overlay',
} satisfies Meta<typeof COverlay>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { COverlay, CText },
    setup() {
      return { lorem }
    },
    template: `
      <div>
        <c-overlay radius="xl" :blur="3">Some content</c-overlay>
        <c-text>{{ lorem }}</c-text>
      </div>
    `,
  }),
}

export const Gradient: Story = {
  render: () => ({
    components: { COverlay, CText },
    setup() {
      return { lorem }
    },
    template: `
      <div>
        <c-overlay gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)">Some content</c-overlay>
        <c-text>{{ lorem }}</c-text>
      </div>
    `,
  }),
}

export const Center: Story = {
  render: () => ({
    components: { COverlay, CText },
    setup() {
      return { lorem }
    },
    template: `
      <div>
        <c-overlay center c="#fff" :opacity="0.9">Some content</c-overlay>
        <c-text>{{ lorem }}</c-text>
      </div>
    `,
  }),
}

export const Fixed: Story = {
  render: () => ({
    components: { COverlay, CText },
    setup() {
      return { lorem }
    },
    template: `
      <div>
        <c-overlay fixed>Some content</c-overlay>
        <c-text>{{ lorem }}</c-text>
      </div>
    `,
  }),
}
