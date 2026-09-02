import { Meta, StoryObj } from '@storybook/vue3-vite'
import CDataList, { CDataListItem, CDataListItemLabel, CDataListItemValue } from '.'

const meta = {
  title: 'DataList',
  component: CDataList,
  render: () => ({}),
} satisfies Meta<typeof CDataList>

export default meta

type Story = StoryObj<typeof meta>

const data = [
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'john@example.com' },
  { label: 'Role', value: 'Software Engineer' },
  { label: 'Location', value: 'San Francisco, CA' },
]

export const Usage: Story = {
  render: () => ({
    components: { CDataList, CDataListItem, CDataListItemLabel, CDataListItemValue },
    setup() {
      return { data }
    },
    template: `
      <div style="padding: 40px;">
        <c-data-list>
          <c-data-list-item v-for="item in data" :key="item.label">
            <c-data-list-item-label>{{ item.label }}</c-data-list-item-label>
            <c-data-list-item-value>{{ item.value }}</c-data-list-item-value>
          </c-data-list-item>
        </c-data-list>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { CDataList, CDataListItem, CDataListItemLabel, CDataListItemValue },
    setup() {
      return { data }
    },
    template: `
      <div style="padding: 40px;">
        <c-data-list orientation="vertical">
          <c-data-list-item v-for="item in data" :key="item.label">
            <c-data-list-item-label>{{ item.label }}</c-data-list-item-label>
            <c-data-list-item-value>{{ item.value }}</c-data-list-item-value>
          </c-data-list-item>
        </c-data-list>
      </div>
    `,
  }),
}

export const WithDivider: Story = {
  render: () => ({
    components: { CDataList, CDataListItem, CDataListItemLabel, CDataListItemValue },
    setup() {
      return { data }
    },
    template: `
      <div style="padding: 40px;">
        <c-data-list with-divider>
          <c-data-list-item v-for="item in data" :key="item.label">
            <c-data-list-item-label>{{ item.label }}</c-data-list-item-label>
            <c-data-list-item-value>{{ item.value }}</c-data-list-item-value>
          </c-data-list-item>
        </c-data-list>
      </div>
    `,
  }),
}

export const VerticalWithDivider: Story = {
  render: () => ({
    components: { CDataList, CDataListItem, CDataListItemLabel, CDataListItemValue },
    setup() {
      return { data }
    },
    template: `
      <div style="padding: 40px;">
        <c-data-list orientation="vertical" with-divider>
          <c-data-list-item v-for="item in data" :key="item.label">
            <c-data-list-item-label>{{ item.label }}</c-data-list-item-label>
            <c-data-list-item-value>{{ item.value }}</c-data-list-item-value>
          </c-data-list-item>
        </c-data-list>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { CDataList, CDataListItem, CDataListItemLabel, CDataListItemValue },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

      return { data, sizes }
    },
    template: `
      <div style="padding: 40px;">
        <div v-for="size in sizes" :key="size" style="margin-bottom: 32px;">
          <h3>Size: {{ size }}</h3>
          <c-data-list :size="size">
            <c-data-list-item v-for="item in data" :key="item.label">
              <c-data-list-item-label>{{ item.label }}</c-data-list-item-label>
              <c-data-list-item-value>{{ item.value }}</c-data-list-item-value>
            </c-data-list-item>
          </c-data-list>
        </div>
      </div>
    `,
  }),
}

export const Unstyled: Story = {
  render: () => ({
    components: { CDataList, CDataListItem, CDataListItemLabel, CDataListItemValue },
    setup() {
      return { data }
    },
    template: `
      <div style="padding: 40px;">
        <c-data-list unstyled>
          <c-data-list-item v-for="item in data" :key="item.label">
            <c-data-list-item-label>{{ item.label }}</c-data-list-item-label>
            <c-data-list-item-value>{{ item.value }}</c-data-list-item-value>
          </c-data-list-item>
        </c-data-list>
      </div>
    `,
  }),
}
