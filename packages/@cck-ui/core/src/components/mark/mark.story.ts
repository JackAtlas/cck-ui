import { Meta, StoryObj } from '@storybook/vue3-vite'
import CMark from '.'

const meta = {
  title: 'Mark',
  component: CMark,
} satisfies Meta<typeof CMark>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CMark },
    template: `
      <div style="padding: 40px;">
        <div>
          <c-mark>Default mark</c-mark>
        </div>
        <div>
          <c-mark color="orange.9">Theme color mark</c-mark>
        </div>
        <div>
          <c-mark color="#f0ff00">CSS color mark</c-mark>
        </div>
      </div>
    `,
  }),
}
