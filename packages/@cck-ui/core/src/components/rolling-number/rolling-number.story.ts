import { Meta, StoryObj } from '@storybook/vue3-vite'
import CRollingNumber from '.'
import CButton from '../button'
import CGroup from '../group'
import CStack from '../stack'
import { ref } from 'vue'

const meta = {
  title: 'RollingNumber',
  component: CRollingNumber,
  args: {
    value: 100,
  },
} satisfies Meta<typeof CRollingNumber>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CButton, CGroup, CRollingNumber, CStack },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      const value = ref(104)

      return { value }
    },
    template: `
      <div style="padding: 40px;">
        <c-stack>
          <c-rolling-number prefix="$ " thousand-separator :decimal-scale="2" :fz="36" :tabular-numbers="true" :value="value"></c-rolling-number>
          <c-group>
            <c-button @click="() => value += 1">+1</c-button>
            <c-button @click="() => value -= 1">-1</c-button>
            <c-button @click="() => value += 100">+100</c-button>
            <c-button @click="() => value -= 100">-100</c-button>
            <c-button @click="() => value = Math.random() * 10000">Random</c-button>
          </c-group>
        </c-stack>
      </div>
    `,
  }),
}

export const DigitCountChange: Story = {
  render: () => ({
    components: { CButton, CGroup, CRollingNumber, CStack },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      const value = ref(99)

      return { value }
    },
    template: `
      <div style="padding: 40px;">
        <c-stack>
          <c-rolling-number thousand-separator :fz="48" :tabular-numbers="true" :value="value" />
          <c-group>
            <c-button @click="() => value = 9">9</c-button>
            <c-button @click="() => value = 99">99</c-button>
            <c-button @click="() => value = 999">999</c-button>
            <c-button @click="() => value = 1000">1000</c-button>
            <c-button @click="() => value = 9999">9999</c-button>
            <c-button @click="() => value = 99999">99999</c-button>
            <c-button @click="() => value = 1000000">1000000</c-button>
          </c-group>
        </c-stack>
      </div>
    `,
  }),
}

export const WithPrefix: Story = {
  render: () => ({
    components: { CButton, CRollingNumber, CStack },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      const value = ref(42)

      return { value }
    },
    template: `
      <div style="padding: 40px;">
        <c-stack>
          <c-rolling-number prefix="$ " thousand-separator :fz="24" :tabular-numbers="true" :value="value" />
          <c-button @click="() => value = Math.floor(Math.random() * 1000)">Random</c-button>
        </c-stack>
      </div>
    `,
  }),
}

export const WithSuffix: Story = {
  render: () => ({
    components: { CButton, CRollingNumber, CStack },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      const value = ref(42)

      return { value }
    },
    template: `
      <div style="padding: 40px;">
        <c-stack>
          <c-rolling-number suffix="%" thousand-separator :fz="24" :tabular-numbers="true" :value="value" />
          <c-button @click="() => value = Math.floor(Math.random() * 100)">Random</c-button>
        </c-stack>
      </div>
    `,
  }),
}

export const ThousandSeparator: Story = {
  render: () => ({
    components: { CButton, CGroup, CRollingNumber, CStack },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      const value = ref(1000000)

      return { value }
    },
    template: `
      <div style="padding: 40px;">
        <c-stack>
          <c-rolling-number thousand-separator :fz="48" :tabular-numbers="true" :value="value" />
          <c-group>
            <c-button @click="() => value += 1234">+1234</c-button>
            <c-button @click="() => value -= 1234">-1234</c-button>
          </c-group>
        </c-stack>
      </div>
    `,
  }),
}

export const CustomDuration: Story = {
  render: () => ({
    components: { CButton, CGroup, CRollingNumber, CStack },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      const value = ref(0)

      return { value }
    },
    template: `
      <div style="padding: 40px;">
        <c-stack>
          <c-rolling-number :animation-duration="1200" :fz="48" :tabular-numbers="true" :value="value" />
          <c-button @click="() => value = Math.floor(Math.random() * 100)">Random</c-button>
        </c-stack>
      </div>
    `,
  }),
}

export const NegativeValues: Story = {
  render: () => ({
    components: { CButton, CGroup, CRollingNumber, CStack },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      const value = ref(50)

      return { value }
    },
    template: `
      <div style="padding: 40px;">
        <c-stack>
          <c-rolling-number prefix="$ " :fz="36" :tabular-numbers="true" :value="value" />
          <c-group>
            <c-button @click="() => value += 25">+25</c-button>
            <c-button @click="() => value -= 25">-25</c-button>
          </c-group>
        </c-stack>
      </div>
    `,
  }),
}

export const WrapAroundRollover: Story = {
  render: () => ({
    components: { CButton, CGroup, CRollingNumber, CStack },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      const value = ref(9)

      return { value }
    },
    template: `
      <div style="padding: 40px;">
        <c-stack>
          <c-rolling-number :animation-duration="1200" :fz="72" :tabular-numbers="true" :value="value" />
          <c-group>
            <c-button @click="() => value += 1">+1</c-button>
            <c-button @click="() => value += 10">+10</c-button>
            <c-button @click="() => value -= 1">-1</c-button>
            <c-button @click="() => value = 9">Reset to 9</c-button>
            <c-button @click="() => value = 99">Reset to 99</c-button>
            <c-button @click="() => value = 999">Reset to 999</c-button>
          </c-group>
        </c-stack>
      </div>
    `,
  }),
}

export const LiveRegion: Story = {
  render: () => ({
    components: { CButton, CGroup, CRollingNumber, CStack },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }

      const value = ref(0)

      return { value }
    },
    template: `
      <div style="padding: 40px;">
        <c-stack>
          <c-rolling-number with-live-region :fz="36" :tabular-numbers="true" :value="value" />
          <c-group>
            <c-button @click="() => value += 1">+1</c-button>
            <c-button @click="() => value += 10">+10</c-button>
          </c-group>
        </c-stack>
      </div>
    `,
  }),
}
