import { Meta, StoryObj } from '@storybook/vue3-vite'
import CFocusTrap from '.'
import { useDisclosure } from '@cck-ui/hooks'

const meta = {
  title: 'FocusTrap',
  component: CFocusTrap,
} satisfies Meta<typeof CFocusTrap>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CFocusTrap },
    setup() {
      const {
        state,
        handlers: { toggle },
      } = useDisclosure(false)
      return { state, toggle }
    },
    template: `
      <div>
        <button type="button" @click="toggle">Toggle</button>
        <c-focus-trap :active="state">
          <div>
            <input />
            <input />
            <input />
          </div>
        </c-focus-trap>
      </div>
    `,
  }),
}
