import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { CLoader } from '.'

const meta = {
  title: 'Loader',
  component: CLoader,
  render: (args) => ({
    components: { CLoader },
    setup() {
      return { args }
    },
    template: `
      <div style="padding:40px;">
        <c-loader></c-loader>
        <c-loader type="bars" mt="xl"></c-loader>
        <c-loader type="dots" mt="xl"></c-loader>
      </div>
    `,
  }),
} satisfies Meta<typeof CLoader>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {}
