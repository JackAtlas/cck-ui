import { Meta, StoryObj } from '@storybook/vue3-vite'
import CThemeIcon from '.'
import CGroup from '../group'
import CStack from '../stack'
import { DEFAULT_THEME } from '../../core'

const meta = {
  title: 'ThemeIcon',
  component: CThemeIcon,
} satisfies Meta<typeof CThemeIcon>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CGroup, CStack, CThemeIcon },
    setup() {
      const colors = Object.keys(DEFAULT_THEME.colors)
      return { colors }
    },
    template: `
      <c-stack>
        <c-group>
          <c-theme-icon>$$</c-theme-icon>
        </c-group>
        <c-group>
          <c-theme-icon v-for="(color, index) in colors" :color="color + '.4'" :key="color" variant="filled">$$</c-theme-icon>
        </c-group>
        <c-group>
          <c-theme-icon v-for="(color, index) in colors" :color="color" :key="color" variant="light">$$</c-theme-icon>
        </c-group>
        <c-group>
          <c-theme-icon v-for="(color, index) in colors" :color="color + '.5'" :key="color" variant="light">$$</c-theme-icon>
        </c-group>
        <c-group>
          <c-theme-icon v-for="(color, index) in colors" :color="color" :key="color" variant="subtle">$$</c-theme-icon>
        </c-group>
        <c-group>
          <c-theme-icon v-for="(color, index) in colors" :color="color + '.5'" :key="color" variant="subtle">$$</c-theme-icon>
        </c-group>
        <c-group>
          <c-theme-icon v-for="(color, index) in colors" :color="color" :key="color" variant="outline">$$</c-theme-icon>
        </c-group>
        <c-group>
          <c-theme-icon v-for="(color, index) in colors" :color="color + '.4'" :key="color" variant="outline">$$</c-theme-icon>
        </c-group>
        <c-group>
          <c-theme-icon v-for="(color, index) in colors" :color="color" :key="color" variant="dashed">$$</c-theme-icon>
        </c-group>
        <c-group>
          <c-theme-icon v-for="(color, index) in colors" :color="color + '.4'" :key="color" variant="dashed">$$</c-theme-icon>
        </c-group>
        <c-group>
          <c-theme-icon v-for="(color, index) in colors" :color="color" :key="color" variant="transparent">$$</c-theme-icon>
        </c-group>
        <c-group>
          <c-theme-icon v-for="(color, index) in colors" :color="color + '.4'" :key="color" variant="transparent">$$</c-theme-icon>
        </c-group>
        <c-group bg="rgba(0, 0, 0, .5)">
          <c-theme-icon v-for="(color, index) in colors" :color="color" :key="color" variant="white">$$</c-theme-icon>
        </c-group>
        <c-group bg="rgba(0, 0, 0, .5)">
          <c-theme-icon v-for="(color, index) in colors" :color="color + '.4'" :key="color" variant="white">$$</c-theme-icon>
        </c-group>
      </c-stack>
    `,
  }),
}

export const CssColor: Story = {
  render: () => ({
    components: { CStack, CThemeIcon },
    template: `
      <c-stack>
        Filled variant
        <div>
          <c-theme-icon color="#ff00ff" radius="xl" size="xl" variant="filled">$$</c-theme-icon>
        </div>
        Light variant
        <div>
          <c-theme-icon color="#ff00ff" radius="xl" size="xl" variant="light">$$</c-theme-icon>
        </div>
        Outline variant
        <div>
          <c-theme-icon color="#ff00ff" radius="xl" size="xl" variant="outline">$$</c-theme-icon>
        </div>
        Dashed variant
        <div>
          <c-theme-icon color="#ff00ff" radius="xl" size="xl" variant="dashed">$$</c-theme-icon>
        </div>
        Subtle variant
        <div>
          <c-theme-icon color="#ff00ff" radius="xl" size="xl" variant="subtle">$$</c-theme-icon>
        </div>
        Transparent variant
        <div>
          <c-theme-icon color="#ff00ff" radius="xl" size="xl" variant="transparent">$$</c-theme-icon>
        </div>
        White variant
        <div style="backgroundColor: rgba(0, 0, 0, .5)">
          <c-theme-icon color="#ff00ff" radius="xl" size="xl" variant="white">$$</c-theme-icon>
        </div>
      </c-stack>
    `,
  }),
}

export const GradientVariant: Story = {
  render: () => ({
    components: { CGroup, CThemeIcon },
    template: `
      <c-group>
        <c-theme-icon size="lg" variant="gradient">$$</c-theme-icon>
        <c-theme-icon size="lg" variant="gradient" :gradient="{ from: 'red', to: 'cyan' }">$$</c-theme-icon>
        <c-theme-icon size="lg" variant="gradient" :gradient="{ from: '#ff00ff', to: '#00ff00' }">$$</c-theme-icon>
      </c-group>
    `,
  }),
}
