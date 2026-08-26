import { Meta, StoryObj } from '@storybook/vue3-vite'
import CDivider from '.'

const meta = {
  title: 'Divider',
  component: CDivider,
} satisfies Meta<typeof CDivider>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CDivider },
    setup() {},
    template: `
      <div style="padding: 40px;">
        <div>First</div>
        <c-divider label-position="right">
          <template #label>Divider label</template>
        </c-divider>
        <div>Second</div>
      </div>
    `,
  }),
}
