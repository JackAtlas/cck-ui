import { Meta, StoryObj } from '@storybook/vue3-vite'
import CPortal from '.'
import { ref } from 'vue'

const meta = {
  title: 'Portal',
  component: CPortal,
} satisfies Meta<typeof CPortal>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CPortal },
    template: `
      <div>
        <div id="portal-target">
          <c-portal style="background: pink;" className="class1 class2">
            <p>First</p>
          </c-portal>
          <c-portal style="background: pink;">
            <p>Second</p>
          </c-portal>
        </div>
      </div>
    `,
  }),
}

export const ReuseDomNode: Story = {
  render: () => ({
    components: { CPortal },
    template: `
      <div>
        <c-portal reuse-target-node>
          <p>First</p>
        </c-portal>
        <c-portal reuse-target-node>
          <p>Second</p>
        </c-portal>
        <c-portal :reuse-target-node="false">
          <p>Third</p>
        </c-portal>
      </div>
    `,
  }),
}

export const ElementTarget: Story = {
  render: () => ({
    components: { CPortal },
    setup() {
      const target = document.createElement('div')
      document.body.appendChild(target)

      return { target }
    },
    template: `
      <div>
        <c-portal :target="target">
          <p>First</p>
        </c-portal>
        <c-portal :target="target">
          <p>Second</p>
        </c-portal>
      </div>
    `,
  }),
}

export const DisabledToggle: Story = {
  render: () => ({
    components: { CPortal },
    setup() {
      const disabled = ref(true)
      const toggle = () => {
        disabled.value = !disabled.value
      }
      return { disabled, toggle }
    },
    template: `
      <div style="padding: 20px;">
        <button @click="toggle" style="margin-bottom: 16px; padding: 8px 16px; cursor: pointer;">
          Toggle Disabled (Current: {{ disabled ? 'true' : 'false' }})
        </button>
        <div style="border: 1px dashed #ccc; padding: 16px; margin-bottom: 16px;">
          <p><strong>Target Container:</strong> (portal content will appear here when enabled)</p>
          <div id="portal-target" style="border: 1px solid blue; min-height: 50px; padding: 8px;">
            <!-- Portal content will be teleported here when disabled=false -->
          </div>
        </div>
        <div style="border: 1px solid #ccc; padding: 16px;">
          <p><strong>Inline Content:</strong> (always visible, moves to portal when enabled)</p>
          <CPortal :disabled="disabled" target="#portal-target" style="background: lightgreen;">
            <p style="margin: 0;">This content is {{ disabled ? 'inline' : 'portaled' }}</p>
          </CPortal>
        </div>
      </div>
    `,
  }),
}
