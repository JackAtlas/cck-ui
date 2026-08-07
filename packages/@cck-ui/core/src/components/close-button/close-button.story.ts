import type { Meta, StoryObj } from '@storybook/vue3-vite'

import CCloseButton from '.'

const meta = {
  title: 'Close Button',
  component: CCloseButton,
  render: (args) => ({
    components: { CCloseButton },
    setup() {
      return { args }
    },
    template: `<c-close-button v-bind="args"></c-close-button>`,
  }),
} satisfies Meta<typeof CCloseButton>

export default meta

type Story = StoryObj<typeof meta>

export const SingleButton: Story = {}

export const Disabled: Story = {
  render: () => ({
    components: { CCloseButton },
    template: `<c-close-button disabled></c-close-button>`,
  }),
}

export const Usage: Story = {
  render: () => ({
    components: { CCloseButton },
    template: `
      <div>
        <c-close-button size="xs"></c-close-button>
        <c-close-button size="sm"></c-close-button>
        <c-close-button size="md"></c-close-button>
        <c-close-button size="lg"></c-close-button>
        <c-close-button size="xl"></c-close-button>
        <c-close-button size="10rem" iconSize="8rem"></c-close-button>
        <c-close-button unstyled></c-close-button>
      </div>
    `,
  }),
}
