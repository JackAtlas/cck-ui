import { Meta, StoryObj } from '@storybook/vue3-vite'
import CSplitter, { CSplitterPane } from '.'
import { ref } from 'vue'

const meta = {
  title: 'Splitter',
  component: CSplitter,
  render: (args) => ({
    components: { CSplitter, CSplitterPane },
    setup() {
      return { args }
    },
  }),
} satisfies Meta<typeof CSplitter>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CSplitter, CSplitterPane },
    template: `
      <c-splitter :h="300" :with-handle="true" :reset-on-double-click="true">
        <c-splitter-pane :default-size="50" :min="20" bg="blue">Left pane</c-splitter-pane>
        <c-splitter-pane :default-size="50" :min="20" bg="teal">Right pane</c-splitter-pane>
      </c-splitter>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { CSplitter, CSplitterPane },
    template: `
      <c-splitter :h="400" orientation="vertical" :with-handle="true" :reset-on-double-click="true">
        <c-splitter-pane :default-size="50" :min="20" bg="blue">Top pane</c-splitter-pane>
        <c-splitter-pane :default-size="50" :min="20" bg="teal">Bottom pane</c-splitter-pane>
      </c-splitter>
    `,
  }),
}

export const ThreePanes: Story = {
  render: () => ({
    components: { CSplitter, CSplitterPane },
    template: `
      <c-splitter :h="300" :with-handle="true" :reset-on-double-click="true">
        <c-splitter-pane :default-size="33" :min="10" bg="blue">Left</c-splitter-pane>
        <c-splitter-pane :default-size="34" :min="10" bg="teal">Middle</c-splitter-pane>
        <c-splitter-pane :default-size="33" :min="10" bg="grape">Right</c-splitter-pane>
      </c-splitter>
    `,
  }),
}

export const Collapsible: Story = {
  render: () => ({
    components: { CSplitter, CSplitterPane },
    template: `
      <c-splitter :h="300" :with-handle="true" :reset-on-double-click="true">
        <c-splitter-pane :default-size="30" :min="15" :collapsible="true" bg="blue">Collapsible sidebar</c-splitter-pane>
        <c-splitter-pane :default-size="70" :min="30" bg="teal">Main content</c-splitter-pane>
      </c-splitter>
    `,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { CSplitter, CSplitterPane },
    setup() {
      const sizes = ref([50, 50])
      const handleSizeChange = (next: number[]) => {
        sizes.value = next
      }
      const setSizes = (newSizes: number[]) => {
        sizes.value = newSizes
      }
      return { sizes, handleSizeChange, setSizes }
    },
    template: `
      <div>
        <div style="margin-bottom: 10px;">
          <button @click="setSizes([30, 70])">30/70</button>
          <button @click="setSizes([50, 50])">50/50</button>
          <button @click="setSizes([70, 30])">70/30</button>
        </div>
        <c-splitter :sizes="sizes" :h="300" :with-handle="true" :reset-on-double-click="true" :on-size-change="handleSizeChange">
          <c-splitter-pane :default-size="50" :min="20" bg="blue">Left ({{ sizes[0].toFixed(1) }}%)</c-splitter-pane>
          <c-splitter-pane :default-size="50" :min="20" bg="teal">Right ({{ sizes[1].toFixed(1) }}%)</c-splitter-pane>
        </c-splitter>
      </div>
    `,
  }),
}

export const Nested: Story = {
  render: () => ({
    components: { CSplitter, CSplitterPane },
    template: `
      <c-splitter :h="400" :with-handle="true" :reset-on-double-click="true">
        <c-splitter-pane :default-size="30" :min="15" bg="blue">Sidebar</c-splitter-pane>
        <c-splitter-pane :default-size="70" :min="30">
          <c-splitter orientation="vertical" h="100%" :with-handle="true" :reset-on-double-click="true">
            <c-splitter-pane :default-size="60" :min="20" bg="teal">Editor</c-splitter-pane>
            <c-splitter-pane :default-size="40" :min="20" bg="grape">Terminal</c-splitter-pane>
          </c-splitter>
        </c-splitter-pane>
      </c-splitter>
    `,
  }),
}

export const CustomLineSize: Story = {
  render: () => ({
    components: { CSplitter, CSplitterPane },
    template: `
      <c-splitter :line-size="6" :h="300" :with-handle="true" :reset-on-double-click="true">
        <c-splitter-pane :default-size="50" :min="20" bg="blue">Left pane</c-splitter-pane>
        <c-splitter-pane :default-size="50" :min="20" bg="teal">Right pane</c-splitter-pane>
      </c-splitter>
    `,
  }),
}

export const NoIcon: Story = {
  render: () => ({
    components: { CSplitter, CSplitterPane },
    template: `
      <c-splitter :handle-icon="null" :h="300" :with-handle="true" :reset-on-double-click="true">
        <c-splitter-pane :default-size="50" :min="20" bg="blue">Left pane</c-splitter-pane>
        <c-splitter-pane :default-size="50" :min="20" bg="teal">Right pane</c-splitter-pane>
      </c-splitter>
    `,
  }),
}
