import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { CText } from '..'

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate asperiores mollitia excepturi voluptas inventore doloribus saepe in iure obcaecati sunt architecto facere quis quasi suscipit recusandae fugit, veniam eaque perspiciatis?'

const meta = {
  title: 'Text',
  component: CText,
  tags: ['autodocs'],
  args: {
    default: 'The quick brown fox jumps over the lazy dog',
  },
  render: (args) => ({
    components: { CText },
    setup() {
      return { args }
    },
    template: `<CText v-bind="args">{{ args.default }}</CText>`,
  }),
} satisfies Meta<typeof CText>

export default meta
type Story = StoryObj<typeof meta>

export const Usage: Story = {
  args: {
    default: 'Just text',
  },
}

export const Sizes: Story = {
  args: {
    default: lorem,
  },
  render: (args) => ({
    components: { CText },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px; max-width: 500px;">
        <c-text size="xs">{{ args.default }}</c-text>
        <c-text size="sm" mt="xl">{{ args.default }}</c-text>
        <c-text size="lg" mt="xl">{{ args.default }}</c-text>
        <c-text size="xl" mt="xl">{{ args.default }}</c-text>
      </div>
    `,
  }),
}

export const Truncate: Story = {
  render: () => ({
    components: { CText },
    template: `
      <div style="padding: 40px; max-width: 300px;">
        <c-text truncate>Please truncate this text from the end</c-text>
        <c-text truncate="start">Please truncate this text from the start</c-text>
        <c-text truncate="end">Please truncate this text from the end</c-text>
      </div>
    `,
  }),
}

export const Gradient: Story = {
  render: () => ({
    components: { CText },
    template: `
      <div style="padding: 40px;">
        <c-text variant="gradient" :fz="50" fw="bold" :gradient="{ from: 'red', to: 'cyan', deg: 180 }">This is gradient text</c-text>
        <c-text variant="gradient" :fz="80" fw="bold">This is gradient text 2</c-text>
      </div>
    `,
  }),
}

export const StyleProps: Story = {
  render: () => ({
    components: { CText },
    template: `
      <div style="padding: 40px;">
        <c-text tt="uppercase">Text transform</c-text>
        <c-text td="underline">Underline</c-text>
        <c-text td="line-through">Strike</c-text>
        <c-text fz="xl">Font size xl</c-text>
        <c-text ta="center">Align center</c-text>
        <c-text fw="bolder">Font weight</c-text>
        <c-text fs="italic">Italic</c-text>
      </div>
    `,
  }),
}

export const LineClamp: Story = {
  render: () => ({
    components: { CText },
    template: `
      <div style="padding: 40px; max-width: 600px;">
        <c-text :line-clamp="3" inherit>From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon that has blue-green skin with        darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are
        visible in the upper jaw when its mouth is open. Each of its thick legs ends with three sharp claws. On Bulbasaur&apos;s back is a green plant bulb, which is grown from a seed planted there at birth. The bulb also conceals two slender, tentacle-like vines and provides it with energy through photosynthesis as well as from the nutrient-rich seeds contained
        within.</c-text>
      </div>
    `,
  }),
}
