import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CImage from '.'
import CGroup from '../group'

const url =
  'https://img.freepik.com/free-photo/shallow-focus-shot-orange-butterfly-yellow-flower_181624-40605.jpg?w=740&t=st=1680534125~exp=1680534725~hmac=a4585a5c52338662fc0439ec1aac90076232ad5c319c886863c30fa4f5894ac6'

const meta = {
  title: 'Image',
  component: CImage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CImage>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  args: {
    src: url,
    h: '600',
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px;">
        <c-image v-bind="args" />
      </div>
    `,
  }),
}

export const WithinGroup: Story = {
  args: {
    src: url,
    h: '200',
    radius: 'md',
  },
  render: (args) => ({
    components: { CImage, CGroup },
    setup() {
      return { args }
    },
    template: `
      <c-group style="padding: 40px;">
        <c-image v-bind="args" />
      </c-group>
    `,
  }),
}

export const Unstyled: Story = {
  args: {
    src: url,
    h: '600',
    radius: 'md',
    unstyled: true,
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px;">
        <c-image v-bind="args" />
      </div>
    `,
  }),
}

export const Fallback: Story = {
  args: {
    src: 'errorurl',
    h: '600',
    radius: 'md',
    fallbackSrc: 'https://placehold.co/600x400',
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px;">
        <c-image v-bind="args" />
      </div>
    `,
  }),
}
