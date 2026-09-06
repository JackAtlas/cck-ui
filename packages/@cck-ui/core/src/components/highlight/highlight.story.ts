import { Meta, StoryObj } from '@storybook/vue3-vite'
import CHighlight from '.'

const meta = {
  title: 'Highlight',
  component: CHighlight,
  args: {
    children: 'Highlight this and also that, oh and this should be highlighted as well',
    highlight: ['this', 'that'],
  },
} satisfies Meta<typeof CHighlight>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: (args) => ({
    components: { CHighlight },
    setup() {
      return { args }
    },
    template: `
      <c-highlight :children="args.children" :highlight="args.highlight" />
    `,
  }),
}

export const Color: Story = {
  render: (args) => ({
    components: { CHighlight },
    setup() {
      return { args }
    },
    template: `
      <c-highlight color="teal" :children="args.children" :highlight="args.highlight" />
    `,
  }),
}

export const Unstyled: Story = {
  render: (args) => ({
    components: { CHighlight },
    setup() {
      return { args }
    },
    template: `
      <c-highlight unstyled :children="args.children" :highlight="args.highlight" />
    `,
  }),
}
