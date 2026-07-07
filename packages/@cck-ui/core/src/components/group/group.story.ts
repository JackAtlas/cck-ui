import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { CGroup } from '.'

const meta = {
  title: 'Group',
  component: CGroup,
  render: (args) => ({
    components: { CGroup },
    setup() {
      return { args }
    },
    template: `<CText v-bind="args">{{ args.default }}</CText>`,
  }),
} satisfies Meta<typeof CGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CGroup },
    template: `
      <div style="padding: 40px;">
        <c-group tag="nav">
          <button type="button">First</button>
          <button type="button">Second</button>
          <button type="button">Third</button>
        </c-group>
      </div>
    `,
  }),
}

export const Grow: Story = {
  render: () => ({
    components: { CGroup },
    template: `
      <div style="padding:40px;">
        <c-group grow :prevent-grow-overflow="false">
          <button type="button">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate asperiores mollitia excepturi voluptas inventore doloribus saepe in iure obcaecati sunt architecto facere quis quasi suscipit recusandae fugit, veniam eaque perspiciatis?</button>
          <button type="button">Second</button>
          <button type="button">Third</button>
        </c-group>
      </div>
    `,
  }),
}
