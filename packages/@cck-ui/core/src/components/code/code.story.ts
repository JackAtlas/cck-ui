import { Meta, StoryObj } from '@storybook/vue3-vite'
import CCode from '.'

const meta = {
  title: 'Code',
  component: CCode,
} satisfies Meta<typeof CCode>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CCode },
    template: `
      <div style="padding: 40px;">
        <c-code>Some code</c-code>
      </div>
    `,
  }),
}

export const Unstyled: Story = {
  render: () => ({
    components: { CCode },
    template: `
      <div style="padding: 40px;">
        <c-code unstyled>Some code</c-code>
      </div>
    `,
  }),
}

const code = `
export function Usage() {
  return (
    <div :style="{ padding: 40 }">
      <Code>Some code</Code>
      <Code color="blue.4">Code with color</Code>
    </div>
  );
}
`.trim()

export const Block: Story = {
  render: () => ({
    components: { CCode },
    setup() {
      return { code }
    },
    template: `
      <div style="padding: 40px;">
        <c-code block>{{ code }}</c-code>
      </div>
    `,
  }),
}
