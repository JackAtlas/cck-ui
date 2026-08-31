import { Meta, StoryObj } from '@storybook/vue3-vite'
import CBackgroundImage from '.'

const meta = {
  title: 'BackgroundImage',
  component: CBackgroundImage,
  args: {
    src: 'https://raw.githubusercontent.com/JackAtlas/cck-ui/main/.demo/images/bg-2.jpg',
  },
  render: (args) => ({
    components: { CBackgroundImage },
    setup() {
      return { args }
    },
  }),
} satisfies Meta<typeof CBackgroundImage>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: (args) => ({
    components: { CBackgroundImage },
    setup() {
      return { args }
    },
    template: `
      <c-background-image :h="200" :src="args.src" :w="400">
        Content
      </c-background-image>
    `,
  }),
}

export const Unstyled: Story = {
  render: (args) => ({
    components: { CBackgroundImage },
    setup() {
      return { args }
    },
    template: `
      <c-background-image radius="md" unstyled :h="200" :src="args.src" :w="400">
        Content
      </c-background-image>
    `,
  }),
}
