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

export const WholeWordMatching: Story = {
  render: () => ({
    components: { CHighlight },
    template: `
      <c-stack gap="md">
        <div>
          <c-text size="sm" :fw="500" :mb="5">With whole-word matching (:whole-word="true")</c-text>
          <c-highlight highlight="the" :case-insensitive="true" :whole-word="true">The theme is there</c-highlight>
        </div>
        <div>
          <c-text size="sm" :fw="500" :mb="5">Without whole word matching (default)</c-text>
          <c-highlight highlight="the" :case-insensitive="true">The theme is there</c-highlight>
        </div>
      </c-stack>
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
