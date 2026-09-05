import { Meta, StoryObj } from '@storybook/vue3-vite'
import CBlockquote from '.'

const meta = {
  title: 'Blockquote',
  component: CBlockquote,
} satisfies Meta<typeof CBlockquote>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CBlockquote },
    template: `
      <div style="padding: 40px; max-width: 820px;">
        <c-blockquote>
          <template #cite>– Forrest Gump</template>
          Life is like an npm install – you never know what you are going to get.
        </c-blockquote>
      </div>
    `,
  }),
}
