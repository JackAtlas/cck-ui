import { Meta, StoryObj } from '@storybook/vue3-vite'
import CBadge from '.'
import CGroup from '../group'

const meta = {
  title: 'Badge',
  component: CBadge,
} satisfies Meta<typeof CBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CBadge, CGroup },
    setup() {
      const variants = [
        'default',
        'light',
        'outline',
        'dashed',
        'dot',
        'transparent',
        'white',
        'gradient',
      ]

      return { variants }
    },
    template: `
      <c-group>
        <c-badge v-for="v in variants" :key="v" :variant="v">{{ v }}</c-badge>
        <c-badge left-section="L">Left section</c-badge>
        <c-badge right-section="R">Right section</c-badge>
        <c-badge left-section="L" right-section="R">Both section</c-badge>
      </c-group>
    `,
  }),
}

export const WithFixedWidth: Story = {
  render: () => ({
    components: { CBadge, CGroup },
    template: `
      <c-group>
        <c-badge left-section="L" right-section="R" :w="200">Badge</c-badge>
        <c-badge left-section="L" :w="200">Badge</c-badge>
        <c-badge right-section="R" :w="200">Badge</c-badge>
        <c-badge :w="200">Badge</c-badge>
        <span>Other content</span>
      </c-group>
    `,
  }),
}

export const Round: Story = {
  render: () => ({
    components: { CBadge },
    template: `
      <c-badge circle size="md">12</c-badge>
    `,
  }),
}

export const AutoContrast: Story = {
  render: () => ({
    components: { CBadge },
    template: `
      <c-badge auto-contrast variant="filled" v-for="(c, idx) in Array(10)" :color="'blue.' + idx" :key="idx">Badge</c-badge>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { CBadge, CGroup },
    template: `
      <c-group :p="40">
        <c-badge variant="light">
          <template #left-section>L</template>
          Light
          <template #right-section>R</template>
        </c-badge>
        <c-badge variant="filled">Filled</c-badge>
        <c-badge variant="outline">Outline</c-badge>
        <c-badge variant="dot">Dot</c-badge>
        <c-badge variant="gradient">Gradient</c-badge>
        <c-badge variant="gradient" :gradient="{ deg: 30, from: 'red', to: 'orange' }">Custom gradient</c-badge>
        <c-badge variant="gradient" :gradient="{ deg: 115, from: '#fc00cf', to: '#ccffef' }">hex gradient</c-badge>
      </c-group>
    `,
  }),
}

export const Unstyled: Story = {
  render: () => ({
    components: { CBadge, CGroup },
    template: `
      <c-group :p="40">
        <c-badge left-section="$$" unstyled>Unstyled badge</c-badge>
      </c-group>
    `,
  }),
}

export const CustomComponent: Story = {
  render: () => ({
    components: { CBadge, CGroup },
    template: `
      <c-group :p="40">
        <c-badge tag="a" href="#">Anchor</c-badge>
        <c-badge tag="button" type="button">Button</c-badge>
      </c-group>
    `,
  }),
}

export const ColorsIndex: Story = {
  render: () => ({
    components: { CBadge, CGroup },
    template: `
      <c-group :p="40">
        <c-badge color="violet.4" variant="dot">Badge</c-badge>
      </c-group>
    `,
  }),
}

export const DotWithRightSection: Story = {
  render: () => ({
    components: { CBadge, CGroup },
    template: `
      <c-group :p="40">
        <c-badge color="red" variant="dot" :w="300">
          Badge
          <template #right-section>R</template>
        </c-badge>
        <c-badge color="red" variant="dot" :w="300">Badge</c-badge>
      </c-group>
    `,
  }),
}
