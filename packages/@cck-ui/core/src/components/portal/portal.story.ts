import { Meta, StoryObj } from '@storybook/vue3-vite'
import CPortal from '.'

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
