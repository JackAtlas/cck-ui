import { Meta, StoryObj } from '@storybook/vue3-vite'
import CAffix from '.'

const meta = {
  title: 'Affix',
  component: CAffix,
} satisfies Meta<typeof CAffix>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CAffix },
    template: `
      <c-affix :position="{ bottom: 'xl', right: 90 }">
        <c-box bg="blue" p="xl">Affix box</c-box>
      </c-affix>
    `,
  }),
}
