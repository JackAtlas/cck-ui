import { Meta, StoryObj } from '@storybook/vue3-vite'
import CColorSwatch from '.'
import CGroup from '../group'

const meta = {
  title: 'ColorSwatch',
  component: CColorSwatch,
  args: {
    color: '#ff00ff',
  },
} satisfies Meta<typeof CColorSwatch>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CColorSwatch, CGroup },
    template: `
      <c-group>
        <c-color-swatch color="#ff00ff" :with-shadow="true" />
        <c-color-swatch color="#ff00ff" unstyled :with-shadow="true" />
        <c-color-swatch color="rgba(0, 56, 13, 0.2)" :with-shadow="true" />
        <c-color-swatch color="rgba(0, 56, 13, 0.2)" :with-shadow="true">$$</c-color-swatch>
        <c-color-swatch color="rgba(0, 56, 13, 0.2)" href="/" tag="a" :with-shadow="true">$$</c-color-swatch>
      </c-group>
    `,
  }),
}
