import { Meta, StoryObj } from '@storybook/vue3-vite'
import CHighlight, { HighlightTerm } from '.'

const meta = {
  title: 'Highlight',
  component: CHighlight,
  args: {
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
      <c-highlight :highlight="args.highlight">Highlight this and also that, oh and this should be highlighted as well</c-highlight>
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
      <c-highlight color="teal" :highlight="args.highlight">Highlight this and also that, oh and this should be highlighted as well</c-highlight>
    `,
  }),
}

export const CustomColorsPerTerm: Story = {
  render: () => ({
    components: { CHighlight },
    setup() {
      const highlight: HighlightTerm[] = [
        { text: 'error', color: 'red' },
        { text: 'warning', color: 'yellow' },
        { text: 'success', color: 'green' },
      ]
      return { highlight }
    },
    template: `
      <c-highlight :highlight="highlight" :case-insensitive="true">Error: Invalid input. Warning: Check this field. Success: All tests passed.</c-highlight>
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
      <c-highlight unstyled :highlight="args.highlight">Highlight this and also that, oh and this should be highlighted as well</highlight>
    `,
  }),
}
