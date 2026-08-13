import { Meta, StoryObj } from '@storybook/vue3-vite'
import CSkeleton from '.'

const meta = {
  title: 'Skeleton',
  component: CSkeleton,
} satisfies Meta<typeof CSkeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CSkeleton },
    template: `
      <c-skeleton :height="200"></c-skeleton>
    `,
  }),
}

export const Circle: Story = {
  render: () => ({
    components: { CSkeleton },
    template: `
      <div style="display: flex">
        <c-skeleton :height="200" circle></c-skeleton>
      </div>
    `,
  }),
}
