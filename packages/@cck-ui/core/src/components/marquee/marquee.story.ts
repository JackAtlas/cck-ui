import { Meta, StoryObj } from '@storybook/vue3-vite'
import CMarquee from '.'
import { CBox } from '../../core'

const colors = ['blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange', 'red']

const meta = {
  title: 'Marquee',
  component: CMarquee,
} satisfies Meta<typeof CMarquee>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CBox, CMarquee },
    setup() {
      return { colors }
    },
    template: `
      <div style="padding: 40px;">
        <c-marquee>
          <c-box v-for="color in colors" :key="color" :w="40" :h="40" :style="{backgroundColor: 'var(--c-color-' + color + '-6)', borderRadius: '4px'}"></c-box>
        </c-marquee>
      </div>
    `,
  }),
}

export const Reverse: Story = {
  render: () => ({
    components: { CBox, CMarquee },
    setup() {
      return { colors }
    },
    template: `
      <div style="padding: 40px;">
        <c-marquee reverse>
          <c-box v-for="color in colors" :key="color" :w="40" :h="40" :style="{backgroundColor: 'var(--c-color-' + color + '-6)', borderRadius: '4px'}"></c-box>
        </c-marquee>
      </div>
    `,
  }),
}

export const PauseOnHover: Story = {
  render: () => ({
    components: { CBox, CMarquee },
    setup() {
      return { colors }
    },
    template: `
      <div style="padding: 40px;">
        <c-marquee pause-on-hover>
          <c-box v-for="color in colors" :key="color" :w="40" :h="40" :style="{backgroundColor: 'var(--c-color-' + color + '-6)', borderRadius: '4px'}"></c-box>
        </c-marquee>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { CBox, CMarquee },
    setup() {
      return { colors }
    },
    template: `
      <div style="padding: 40px;">
        <c-marquee orientation="vertical">
          <c-box v-for="color in colors" :key="color" :w="40" :h="40" :style="{backgroundColor: 'var(--c-color-' + color + '-6)', borderRadius: '4px'}"></c-box>
        </c-marquee>
      </div>
    `,
  }),
}

export const VerticalReverse: Story = {
  render: () => ({
    components: { CBox, CMarquee },
    setup() {
      return { colors }
    },
    template: `
      <div style="padding: 40px;">
        <c-marquee orientation="vertical" reverse>
          <c-box v-for="color in colors" :key="color" :w="40" :h="40" :style="{backgroundColor: 'var(--c-color-' + color + '-6)', borderRadius: '4px'}"></c-box>
        </c-marquee>
      </div>
    `,
  }),
}

export const FastAnimation: Story = {
  render: () => ({
    components: { CBox, CMarquee },
    setup() {
      return { colors }
    },
    template: `
      <div style="padding: 40px;">
        <c-marquee :duration="10000">
          <c-box v-for="color in colors" :key="color" :w="40" :h="40" :style="{backgroundColor: 'var(--c-color-' + color + '-6)', borderRadius: '4px'}"></c-box>
        </c-marquee>
      </div>
    `,
  }),
}

export const CustomGap: Story = {
  render: () => ({
    components: { CBox, CMarquee },
    setup() {
      return { colors }
    },
    template: `
      <div style="padding: 40px;">
        <c-marquee gap="xl">
          <c-box v-for="color in colors" :key="color" :w="40" :h="40" :style="{backgroundColor: 'var(--c-color-' + color + '-6)', borderRadius: '4px'}"></c-box>
        </c-marquee>
      </div>
    `,
  }),
}

export const CustomRepeat: Story = {
  render: () => ({
    components: { CBox, CMarquee },
    setup() {
      return { colors }
    },
    template: `
      <div style="padding: 40px;">
        <c-marquee :repeat="2">
          <c-box v-for="color in colors" :key="color" :w="40" :h="40" :style="{backgroundColor: 'var(--c-color-' + color + '-6)', borderRadius: '4px'}"></c-box>
        </c-marquee>
      </div>
    `,
  }),
}

export const MultipleRows: Story = {
  render: () => ({
    components: { CBox, CMarquee },
    setup() {
      return { colors }
    },
    template: `
      <div style="padding: 40px;">
        <c-marquee>
          <c-box v-for="color in colors" :key="color" :w="40" :h="40" :style="{backgroundColor: 'var(--c-color-' + color + '-6)', borderRadius: '4px'}"></c-box>
        </c-marquee>
        <c-marquee reverse>
          <c-box v-for="color in colors" :key="color" :w="40" :h="40" :style="{backgroundColor: 'var(--c-color-' + color + '-6)', borderRadius: '4px'}"></c-box>
        </c-marquee>
        <c-marquee>
          <c-box v-for="color in colors" :key="color" :w="40" :h="40" :style="{backgroundColor: 'var(--c-color-' + color + '-6)', borderRadius: '4px'}"></c-box>
        </c-marquee>
      </div>
    `,
  }),
}
