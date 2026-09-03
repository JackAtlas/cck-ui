import { Meta, StoryObj } from '@storybook/vue3-vite'
import CKbd from '.'

const meta = {
  title: 'Kbd',
  component: CKbd,
} satisfies Meta<typeof CKbd>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CKbd },
    template: `
      <div style="padding: 40px;">
        <c-kbd :size="30">Shift</c-kbd>
      </div>
    `,
  }),
}
