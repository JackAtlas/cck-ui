import { Meta, StoryObj } from '@storybook/vue3-vite'
import COverflowList from '.'
import CBadge from '../badge'
import { ref } from 'vue'
import CButton from '../button'
import CGroup from '../group'

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Indian Fig',
  'Jackfruit',
  'Kiwi',
  'Lemon',
  'Mango',
  'Nectarine',
  'Orange',
  'Papaya',
]

const meta = {
  title: 'OverflowList',
  component: COverflowList,
  args: {
    data: fruits,
  },
} satisfies Meta<typeof COverflowList>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: (args) => ({
    components: { CBadge, CButton, COverflowList },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      const maxRows = ref(1)
      const increaseRows = () => {
        maxRows.value += 1
      }
      return { args, increaseRows, maxRows }
    },
    template: `
      <div style="padding:40px; max-width: 500px; resize: horizontal; overflow: hidden;">
        <c-overflow-list :data="args.data" :max-rows="maxRows" :gap="4">
          <template #item="{ item, index }">
            <c-badge variant="filled" :key="index">{{ item }}</c-badge>
          </template>
          <template #overflow="{ items }">
            <c-badge variant="filled">+{{ items.length }}</c-badge>
          </template>
        </c-overflow-list>
        <c-button mt="xs" size="compact-sm" @click="increaseRows">Increase</c-button>
      </div>
    `,
  }),
}

export const ReorderRecompute: Story = {
  render: () => ({
    components: { CBadge, CButton, CGroup, COverflowList },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      const data = ref(['A', 'B', 'C', 'D', 'E', 'VeryLongItemNameThatTakesSpace'])
      const toggle = () => {
        data.value = data.value.toReversed()
      }
      return { data, toggle }
    },
    template: `
      <div style="padding: 40px;">
        <c-group mb="md">
          <c-button data-testid="reorder" @click="toggle">Toggle order (same length)</c-button>
        </c-group>
        <c-group mb="md">
          <c-badge v-for="item in data" :key="item">{{ item }}</c-badge>
        </c-group>
        <div data-testid="container" style="width: 340px; border: 2px solid var(--c-color-red-filled); padding: 4px;">
          <c-overflow-list :data="data" :gap="4" :max-rows="1">
            <template #item="{ item, index }">
              <c-badge variant="filled" :key="index">{{ item }}</c-badge>
            </template>
            <template #overflow="{ items }">
              <c-badge variant="filled">+{{ items.length }} more</c-badge>
            </template>
          </c-overflow-list>
        </div>
      </div>
    `,
  }),
}

export const CollapseFrom: Story = {
  render: (args) => ({
    components: { CBadge, COverflowList },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      return { args }
    },
    template: `
      <div style="padding:40px; max-width: 500px; resize: horizontal; overflow: hidden;">
        <c-overflow-list collapse-from="start" :data="args.data" :gap="4">
          <template #item="{ item, index }">
            <c-badge variant="filled" :key="index">{{ item }}</c-badge>
          </template>
          <template #overflow="{ items }">
            <c-badge variant="filled">+{{ items.length }}</c-badge>
          </template>
        </c-overflow-list>
      </div>
    `,
  }),
}
