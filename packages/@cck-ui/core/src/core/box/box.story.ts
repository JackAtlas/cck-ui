import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { DEFAULT_THEME, rgba } from '../config-provider'

import { CBox } from '.'

const pink = rgba(DEFAULT_THEME.colors.pink[5], 1)

const meta = {
  title: 'Box',
  component: CBox,
  args: {},
  render: (args) => ({
    components: { CBox },
    setup() {
      return { args }
    },
    template: `<c-box v-bind="args">{{ args.default }}</c-box>`,
  }),
} satisfies Meta<typeof CBox>

export default meta
type Story = StoryObj<typeof meta>

export const Usage: Story = {
  args: {
    className: '',
    default: 'Visible from sm',
  },
  render: (args) => ({
    components: { CBox },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px;">
        <c-box bg="orange.4" ms="xl" fz="h2" lh="h1" :bdrs="100">{{ args.default }}</c-box>
      </div>
    `,
  }),
}

export const VirtualColor: Story = {
  args: {
    className: '',
    default: 'Virtual bg',
  },
  render: (args) => ({
    components: { CBox },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px;">
        <c-box bg="virtual.4" p="xl">{{ args.default }}</c-box>
      </div>
    `,
  }),
}

export const ColorMix: Story = {
  args: {
    className: '',
  },
  render: () => ({
    components: { CBox },
    template: `
      <div style="padding: 40px;">
        <c-box bg="${pink}" :h="200" :w="200">Pink.6</c-box>
        <c-box bg="color-mix(in srgb, var(--c-color-pink-5), white 20%)" :h="200" :w="200">Pink.6 color-mix</c-box>
      </div>
    `,
  }),
}
