import { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { useCollapse, useHorizontalCollapse } from './use-collapse'

const meta = {
  title: 'use-collapse',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const VerticalUsage: Story = {
  render: () => ({
    setup() {
      const expanded = ref(false)
      const { state, elementRef, getCollapseProps } = useCollapse({ expanded })

      const toggle = () => {
        expanded.value = !expanded.value
      }

      return { expanded, state, elementRef, getCollapseProps, toggle }
    },
    template: `
      <div style="padding: 40px">
        <button @click="toggle" style="padding: 8px 16px; cursor: pointer; margin-bottom: 8px;">{{ expanded ? 'Collapse' : 'Expand' }}</button>

        <div ref="elementRef" v-bind="getCollapseProps()">
          <div style="padding: 20px; background: #228be6; color: white; border-radius: 8px;">
            <p>This content is collapsible.</p>
            <p>It animates its height when toggled.</p>
            <p>Third line of content for height.</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const VerticalInitiallyExpanded: Story = {
  render: () => ({
    setup() {
      const expanded = ref(true)
      const { state, elementRef, getCollapseProps } = useCollapse({ expanded })

      const toggle = () => {
        expanded.value = !expanded.value
      }

      return { expanded, state, elementRef, getCollapseProps, toggle }
    },
    template: `
      <div style="padding: 40px">
        <button @click="toggle" style="padding: 8px 16px; cursor: pointer; margin-bottom: 8px;">{{ expanded ? 'Collapse' : 'Expand' }}</button>

        <div ref="elementRef" v-bind="getCollapseProps()">
          <div style="padding: 20px; background: #228be6; color: white; border-radius: 8px;">
            <p>This starts expanded.</p>
            <p>Click the button to collapse it.</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const HorizontalUsage: Story = {
  render: () => ({
    setup() {
      const expanded = ref(false)
      const { state, elementRef, getCollapseProps } = useHorizontalCollapse({
        expanded,
      })

      const toggle = () => {
        expanded.value = !expanded.value
      }

      return { expanded, state, elementRef, getCollapseProps, toggle }
    },
    template: `
      <div style="padding: 40px">
        <button @click="toggle" style="padding: 8px 16px; cursor: pointer; margin-bottom: 8px;">{{ expanded ? 'Collapse' : 'Expand' }} (state: {{ state }})</button>

        <div style="display: flex">
          <div ref="elementRef" v-bind="getCollapseProps()">
            <div style="padding: 20px; background: #228be6; color: white; border-radius: 8px; white-space: nowrap">
              <p>This content collapses horizontally. It has enough width to demonstrate the animation.</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const HorizontalInitiallyExpanded: Story = {
  render: () => ({
    setup() {
      const expanded = ref(true)
      const { state, elementRef, getCollapseProps } = useHorizontalCollapse({
        expanded,
      })

      const toggle = () => {
        expanded.value = !expanded.value
      }

      return { expanded, state, elementRef, getCollapseProps, toggle }
    },
    template: `
      <div style="padding: 40px">
        <button @click="toggle" style="padding: 8px 16px; cursor: pointer; margin-bottom: 8px;">{{ expanded ? 'Collapse' : 'Expand' }} (state: {{ state }})</button>

        <div style="display: flex">
          <div ref="elementRef" v-bind="getCollapseProps()">
            <div style="padding: 20px; background: #228be6; color: white; border-radius: 8px; white-space: nowrap">
              <p>This starts expanded and collapses horizontally.</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
