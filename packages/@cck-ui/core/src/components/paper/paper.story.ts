import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CPaper from '.'

const meta = {
  title: 'Paper',
  component: CPaper,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CPaper>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  args: {
    shadow: 'md',
    withBorder: true,
    p: 'xl',
  },
  render: (args) => ({
    components: { CPaper },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px; max-width: 600px;">
        <c-paper v-bind="args">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, et illo? Dolores
          mollitia, maiores est totam ab libero itaque fuga, dolorum hic nesciunt quibusdam, esse amet
          magni quia voluptatibus molestias!
        </c-paper>
      </div>
    `,
  }),
}

export const SpaceSeparatedRadius: Story = {
  args: {
    radius: '0 0 1rem 1rem',
    shadow: 'md',
    withBorder: true,
    p: 'xl',
  },
  render: (args) => ({
    components: { CPaper },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px; max-width: 600px;">
        <c-paper v-bind="args">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, et illo? Dolores
          mollitia, maiores est totam ab libero itaque fuga, dolorum hic nesciunt quibusdam, esse amet
          magni quia voluptatibus molestias!
        </c-paper>
      </div>
    `,
  }),
}

export const NestedPapers: Story = {
  render: () => ({
    components: { CPaper },
    template: `
      <div style="padding: 40px; max-width: 600px;">
        <c-paper p="md" with-border shadow="md">
          Parent
          <c-paper p="md" shadow="none">
            Child
          </c-paper>
        </c-paper>
      </div>
    `,
  }),
}
