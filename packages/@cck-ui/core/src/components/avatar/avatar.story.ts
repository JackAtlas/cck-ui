import { Meta, StoryObj } from '@storybook/vue3-vite'
import CAvatar, { CAvatarGroup } from '.'
import CGroup from '../group'

const meta = {
  title: 'Avatar',
  component: CAvatar,
} satisfies Meta<typeof CAvatar>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CAvatar, CGroup },
    template: `
      <c-group>
        <c-avatar>AN</c-avatar>
        <c-avatar src="https://randomuser.me/api/portraits/lego/2.jpg">AN</c-avatar>
      </c-group>
    `,
  }),
}

export const InitialsColor: Story = {
  render: () => ({
    components: { CAvatar, CGroup },
    setup() {
      const names = [
        'John Doe',
        'Jane Mol',
        'Alex Lump',
        'Sarah Condor',
        'Mike Johnson',
        'Kate Kok',
        'Tom Smith',
      ]

      return { names }
    },
    template: `
      <c-group>
        <c-avatar color="initials" v-for="name in names" :key="name" :name="name" />
      </c-group>
    `,
  }),
}

export const AutoContrast: Story = {
  render: () => ({
    components: { CAvatar, CGroup },
    template: `
      <c-group>
        <c-avatar
          auto-contrast
          variant="filled"
          v-for="(n, idx) in Array(10)"
          :color="'red.' + idx"
          :key="idx"
          >$$</c-avatar
        >
      </c-group>
    `,
  }),
}

export const CustomComponent: Story = {
  render: () => ({
    components: { CAvatar, CGroup },
    template: `
      <c-group>
        <c-avatar tag="a" href="https://cck-ui.jackatlas.xyz">AN</c-avatar>
        <c-avatar tag="button" type="button">BU</c-avatar>
      </c-group>
    `,
  }),
}

export const AvatarGroup: Story = {
  render: () => ({
    components: { CAvatar, CAvatarGroup },
    template: `
      <c-avatar-group>
        <c-avatar color="blue" radius="xl">AN</c-avatar>
        <c-avatar color="red" radius="xl">BU</c-avatar>
        <c-avatar radius="xl">+3</c-avatar>
      </c-avatar-group>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { CAvatar, CGroup },
    setup() {
      const variants = ['default', 'filled', 'light', 'white', 'outline', 'dashed', 'gradient']

      return { variants }
    },
    template: `
      <c-group>
        <c-avatar color="blue" radius="md" v-for="v in variants" :key="v" :variant="v">ZH</c-avatar>
      </c-group>
      <c-group>
        <c-avatar color="blue" radius="xl" v-for="v in variants" :key="v" :variant="v">ZH</c-avatar>
      </c-group>
      <c-group>
        <c-avatar
          color="blue"
          radius="xl"
          src="https://randomuser.me/api/portraits/lego/2.jpg"
          v-for="v in variants"
          :key="v"
          :variant="v"
          >ZH</c-avatar
        >
      </c-group>
    `,
  }),
}

export const Gradient: Story = {
  render: () => ({
    components: { CAvatar, CGroup },
    template: `
      <c-group>
        <c-box>
          <c-text>Default</c-text>
          <c-center>
            <c-avatar radius="md" variant="gradient">ZH</c-avatar>
          </c-center>
        </c-box>
        <c-box>
          <c-text>Specific</c-text>
          <c-center>
            <c-avatar radius="md" variant="gradient" :gradient="{ from: 'orange', to: 'red' }"
              >ZH</c-avatar
            >
          </c-center>
        </c-box>
      </c-group>
    `,
  }),
}

export const Unstyled: Story = {
  render: () => ({
    components: { CAvatar, CGroup },
    template: `
      <c-group>
        <c-avatar src="https://randomuser.me/api/portraits/lego/2.jpg" unstyled />
        <c-avatar unstyled>MX</c-avatar>
      </c-group>
    `,
  }),
}
