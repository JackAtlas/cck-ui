import { Meta, StoryObj } from '@storybook/vue3-vite'
import CBreadcrumbs from '.'
import CAnchor from '../anchor'

const meta = {
  title: 'Breadcrumbs',
  component: CBreadcrumbs,
  argTypes: {
    separator: { control: 'text' },
    separatorMargin: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof CBreadcrumbs>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: (args) => ({
    components: { CBreadcrumbs, CAnchor },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px;">
        <c-breadcrumbs v-bind="args">
          <c-anchor href="#">Link 1</c-anchor>
          <c-anchor href="#">Link 2</c-anchor>
          <c-anchor href="#">Link 3</c-anchor>
        </c-breadcrumbs>
      </div>
    `,
  }),
}

export const Unstyled: Story = {
  render: (args) => ({
    components: { CBreadcrumbs },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px;">
        <c-breadcrumbs v-bind="args" unstyled>
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </c-breadcrumbs>
      </div>
    `,
  }),
}

export const CustomSeparatorSlot: Story = {
  render: (args) => ({
    components: { CBreadcrumbs, CAnchor },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px;">
        <c-breadcrumbs v-bind="args">
          <template #separator>
            <span style="color: var(--c-color-red-filled); font-weight: bold;">→</span>
          </template>
          <c-anchor href="#">Home</c-anchor>
          <c-anchor href="#">Products</c-anchor>
          <c-anchor href="#">Electronics</c-anchor>
          <span>Phone</span>
        </c-breadcrumbs>
      </div>
    `,
  }),
}

export const DynamicSeparator: Story = {
  render: () => ({
    components: { CBreadcrumbs, CAnchor },
    setup() {
      const dynamicSeparator = (_child: any, index: number, _length: number) => {
        if (index === 1) {
          return '>'
        }
        return '/'
      }
      return { dynamicSeparator }
    },
    template: `
      <div style="padding: 40px;">
        <c-breadcrumbs :separator="dynamicSeparator">
          <c-anchor href="#">Dashboard</c-anchor>
          <c-anchor href="#">Settings</c-anchor>
          <c-anchor href="#">Profile</c-anchor>
          <span>Edit</span>
        </c-breadcrumbs>
      </div>
    `,
  }),
}

export const WithMargin: Story = {
  render: (args) => ({
    components: { CBreadcrumbs, CAnchor },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 40px;">
        <c-breadcrumbs v-bind="args">
          <c-anchor href="#">Item 1</c-anchor>
          <c-anchor href="#">Item 2</c-anchor>
          <c-anchor href="#">Item 3</c-anchor>
        </c-breadcrumbs>
      </div>
    `,
  }),
  args: {
    separator: '·',
    separatorMargin: 'lg',
  },
}

export const IconSeparator: Story = {
  render: () => ({
    components: { CBreadcrumbs, CAnchor },
    setup() {
      const iconSeparator = () => '⚡'
      return { iconSeparator }
    },
    template: `
      <div style="padding: 40px;">
        <c-breadcrumbs :separator="iconSeparator">
          <c-anchor href="#">Link 1</c-anchor>
          <c-anchor href="#">Link 2</c-anchor>
          <c-anchor href="#">Link 3</c-anchor>
        </c-breadcrumbs>
      </div>
    `,
  }),
}
