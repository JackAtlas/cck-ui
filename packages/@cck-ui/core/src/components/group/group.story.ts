import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { CGroup } from '.'
import { ref } from 'vue'

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

export const Responsive: Story = {
  render: () => ({
    components: { CGroup },
    setup() {
      const items = ref(['Button A', 'Button B', 'Button C'])

      const addItem = () => {
        const next = items.value.length + 1
        items.value.push(`Button ${String.fromCharCode(64 + next)}`)
      }

      const removeItem = () => {
        if (items.value.length > 1) {
          items.value.pop()
        }
      }

      const resetItems = () => {
        items.value = ['Button A', 'Button B', 'Button C']
      }

      return { items, addItem, removeItem, resetItems }
    },
    template: `
      <div style="padding: 40px;">
        <div style="margin-bottom: 20px; display: flex; gap: 12px; flex-wrap: wrap;">
          <button @click="addItem" style="padding: 6px 16px; background: #228be6; color: white; border: none; border-radius: 4px; cursor: pointer;">➕ Add Item</button>
          <button @click="removeItem" style="padding: 6px 16px; background: #228be6; color: white; border: none; border-radius: 4px; cursor: pointer;">➖ Remove Item</button>
          <button @click="resetItems" style="padding: 6px 16px; background: #228be6; color: white; border: none; border-radius: 4px; cursor: pointer;">🔄 Reset</button>
          <span style="margin-left: 12px; align-self: center; font-size: 14px; color: #495057;">Current count: {{ items.length }}</span>
        </div>

        <c-group gap="md" grow :prevent-grow-overflow="false">
          <button style="padding: 8px 12px; background: #e9ecef; border: 1px solid #ced4da; border-radius: 4px; text-align: center;" type="button" v-for="(label, idx) in items" :key="idx">{{ label }}</button>
        </c-group>
      </div>
    `,
  }),
}
