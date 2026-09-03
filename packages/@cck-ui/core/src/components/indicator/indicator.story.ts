import { Meta, StoryObj } from '@storybook/vue3-vite'
import CIndicator from '.'
import CAvatar from '../avatar'
import CGroup from '../group'
import { CBox } from '../../core'
import CStack from '../stack'

const meta = {
  title: 'Indicator',
  component: CIndicator,
} satisfies Meta<typeof CIndicator>

export default meta

type Story = StoryObj<typeof meta>

const positions = ['top', 'middle', 'bottom']
const placements = ['start', 'center', 'end']

export const Usage: Story = {
  render: () => ({
    components: { CAvatar, CBox, CGroup, CIndicator, CStack },
    setup() {
      return { placements, positions }
    },
    template: `
      <c-box :p="40">
        <c-group>
          <template v-for="position in positions">
            <c-indicator v-for="placement in placements" :key="position + '-' + placement" :position="position + '-' + placement">
              <c-avatar :radius="0"></c-avatar>
            </c-indicator>
          </template>
        </c-group>
      </c-box>
    `,
  }),
}

export const Inline: Story = {
  render: () => ({
    components: { CAvatar, CBox, CIndicator },
    template: `
      <c-box :p="40">
        <c-indicator inline with-border>
          <c-avatar :radius="0">
        </c-indicator>
      </c-box>
    `,
  }),
}

export const AutoContrast: Story = {
  render: () => ({
    components: { CAvatar, CBox, CIndicator },
    template: `
      <c-box :p="40">
        <c-indicator auto-contrast color="lime.4" inline label="New" :size="20">
          <c-avatar radius="xl" src="https://picsum.photos/50/50">
        </c-indicator>
      </c-box>
    `,
  }),
}

export const Offset: Story = {
  render: () => ({
    components: { CAvatar, CBox, CIndicator },
    template: `
      <c-box :p="40">
        <c-indicator color="red" inline position="bottom-end" :offset="12" :size="20">
          <c-avatar :radius="50000" size="xl" src="https://picsum.photos/50/50">
        </c-indicator>
      </c-box>
    `,
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { CAvatar, CBox, CIndicator },
    template: `
      <c-box :p="40">
        <c-indicator inline label="New" :size="18">
          <c-avatar :radius="0" />
        </c-indicator>
      </c-box>
    `,
  }),
}

export const Processing: Story = {
  render: () => ({
    components: { CAvatar, CBox, CIndicator },
    template: `
      <c-box :p="40">
        <c-indicator inline processing :size="20">
          <c-avatar radius="lg" src="https://picsum.photos/50/50">
        </c-indicator>
      </c-box>
    `,
  }),
}
