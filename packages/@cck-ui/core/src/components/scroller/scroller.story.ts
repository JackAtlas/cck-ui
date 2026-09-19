import { Meta, StoryObj } from '@storybook/vue3-vite'
import CScroller from '.'
import CGroup from '../group'
import CBadge from '../badge'

const meta = {
  title: 'Scroller',
  component: CScroller,
} satisfies Meta<typeof CScroller>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CBadge, CGroup, CScroller },
    setup() {
      const badges = Array.from({ length: 20 })

      return { badges }
    },
    template: `
      <div style="padding: 40px; max-width: 600px;">
        <c-scroller>
          <c-group gap="xs" wrap="nowrap">
            <c-badge miw="fit-content" size="lg" variant="light" v-for="(_, index) in badges" :key="index">
              Badge {{ index + 1 }}
            </c-badge>
          </c-group>
        </c-scroller>
      </div>
    `,
  }),
}

export const CustomScrollAmount: Story = {
  render: () => ({
    components: { CBadge, CGroup, CScroller },
    setup() {
      const badges = Array.from({ length: 20 })

      return { badges }
    },
    template: `
      <div style="padding: 40px; max-width: 600px;">
        <c-scroller :scrollAmount="400">
          <c-group gap="xs" wrap="nowrap">
            <c-badge miw="fit-content" size="lg" variant="light" v-for="(_, index) in badges" :key="index">
              Badge {{ index + 1 }}
            </c-badge>
          </c-group>
        </c-scroller>
      </div>
    `,
  }),
}

export const SmallControlSize: Story = {
  render: () => ({
    components: { CBadge, CGroup, CScroller },
    setup() {
      const badges = Array.from({ length: 20 })

      return { badges }
    },
    template: `
      <div style="padding: 40px; max-width: 600px;">
        <c-scroller control-size="30">
          <c-group gap="xs" wrap="nowrap">
            <c-badge miw="fit-content" size="lg" variant="light" v-for="(_, index) in badges" :key="index">
              Badge {{ index + 1 }}
            </c-badge>
          </c-group>
        </c-scroller>
      </div>
    `,
  }),
}

export const LargeControlSize: Story = {
  render: () => ({
    components: { CBadge, CGroup, CScroller },
    setup() {
      const badges = Array.from({ length: 20 })

      return { badges }
    },
    template: `
      <div style="padding: 40px; max-width: 600px;">
        <c-scroller :control-size="80">
          <c-group gap="xs" wrap="nowrap">
            <c-badge miw="fit-content" size="xl" variant="light" v-for="(_, index) in badges" :key="index">
              Badge {{ index + 1 }}
            </c-badge>
          </c-group>
        </c-scroller>
      </div>
    `,
  }),
}

export const AlwaysShowControls: Story = {
  render: () => ({
    components: { CBadge, CGroup, CScroller },
    setup() {
      const badges = Array.from({ length: 20 })

      return { badges }
    },
    template: `
      <div style="padding: 40px; max-width: 600px;">
        <c-scroller show-start-control show-end-control>
          <c-group gap="xs" wrap="nowrap">
            <c-badge miw="fit-content" size="lg" variant="light" v-for="(_, index) in badges" :key="index">
              Badge {{ index + 1 }}
            </c-badge>
          </c-group>
        </c-scroller>
      </div>
    `,
  }),
}

export const NoOverflow: Story = {
  render: () => ({
    components: { CBadge, CGroup, CScroller },
    setup() {
      const badges = Array.from({ length: 20 })

      return { badges }
    },
    template: `
      <div style="padding: 40px; max-width: 600px;">
        <c-scroller>
          <c-group gap="xs" wrap="nowrap">
            <c-badge miw="fit-content" size="lg" variant="light">
              Badge 1
            </c-badge>
            <c-badge miw="fit-content" size="lg" variant="light">
              Badge 2
            </c-badge>
            <c-badge miw="fit-content" size="lg" variant="light">
              Badge 3
            </c-badge>
          </c-group>
        </c-scroller>
      </div>
    `,
  }),
}

export const Rtl: Story = {
  render: () => ({
    components: { CBadge, CGroup, CScroller },
    setup() {
      const badges = Array.from({ length: 20 })

      return { badges }
    },
    template: `
      <div style="padding: 40px; max-width: 600px;" dir="rtl">
        <c-scroller>
          <c-group gap="xs" wrap="nowrap">
            <c-badge miw="fit-content" size="lg" variant="light" v-for="(_, index) in badges" :key="index">
              Badge {{ index + 1 }}
            </c-badge>
          </c-group>
        </c-scroller>
      </div>
    `,
  }),
}
