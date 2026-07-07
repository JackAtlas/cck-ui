import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ButtonProps, CButton, CButtonGroup, CButtonGroupSection } from '.'
import {
  CckConfigProvider,
  colorsTuple,
  createTheme,
  CTheme,
  DEFAULT_THEME,
  useCckColorScheme,
  virtualColor,
} from '../../core'
import { ref } from 'vue'

const meta = {
  title: 'Button',
  component: CButton,
} satisfies Meta<typeof CButton>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  render: () => ({
    components: { CButton },
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

      const attributes = {
        inner: {
          'data-test-id': 1,
        },
      }
      return { attributes }
    },
    template: `
      <c-button :attributes="attributes">Button</c-button>
    `,
  }),
}

export const AutoContrast: Story = {
  render: () => ({
    components: { CButton },
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

      const count = 10
      return { count }
    },
    template: `
      <div style="display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:40px;">
        <c-button variant="filled" v-for="i in count" :key="i" :color="'red.' + (i - 1)" auto-contrast>Button</c-button>
      </div>
    `,
  }),
}

const virtualColorTheme = createTheme({
  autoContrast: true,
  primaryColor: 'adaptive',
  colors: {
    white: colorsTuple('#ffffff'),
    black: colorsTuple('#000000'),
    adaptive: virtualColor({ name: 'adaptive', dark: 'white', light: 'black' }),
    brand: virtualColor({ name: 'brand', dark: 'violet', light: 'yellow' }),
  },
})

export const VirtualColorAutoContrast: Story = {
  render: () => ({
    components: { CckConfigProvider, CButton },
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

      const { colorScheme, toggleColorScheme } = useCckColorScheme()
      return {
        colorScheme,
        toggleColorScheme,
        virtualColorTheme,
      }
    },
    template: `
      <cck-config-provider :theme="virtualColorTheme">
        <div style="display:flex;flex-direction:column;align-items:flex-start;gap:16px;padding:40px;">
          <c-button @click="toggleColorScheme">
            Toggle color scheme (current: {{ colorScheme }})
          </c-button>
          <c-button variant="filled" color="adaptive" auto-contrast>
            adaptive - autoContrast
          </c-button>
        </div>
      </cck-config-provider>
    `,
  }),
}

export const PolymorphicAlignment: Story = {
  render: () => ({
    components: { CButton },
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
    },
    template: `
      <div style="padding:40px">
        <c-button>Button</c-button>
        <c-button tag="div">Button</c-button>
        <c-button tag="a">Button</c-button>
      </div>
    `,
  }),
}

export const SingleButton: Story = {
  render: () => ({
    components: { CButton },
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
    },
    template: `
      <div style="padding:40px">
        <c-button variant="outline" size="xl">Button</c-button>
        <c-button disabled variant="outline" size="xl">Button</c-button>
      </div>
    `,
  }),
}

// TODO
// export const WithinDisabledFieldset: Story = {}

export const Usage: Story = {
  render: () => ({
    components: { CButton },
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

      const colors = Object.keys(DEFAULT_THEME.colors)

      return { colors }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:30px;padding:40px;">
        <!-- Default variant -->
        <div>
          <h3>Default variant:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color">Button</c-button>
          </div>
        </div>
        
        <!-- Filled variant -->
        <div>
          <h3>Filled variant:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color" variant="filled">Button</c-button>
          </div>
        </div>
        
        <!-- Filled variant with index 4 -->
        <div>
          <h3>Filled variant index 4:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color + '.4'" variant="filled">Button</c-button>
          </div>
        </div>
        
        <!-- Light variant -->
        <div>
          <h3>Light variant:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color" variant="light">Button</c-button>
          </div>
        </div>
        
        <!-- Light variant with index 5 -->
        <div>
          <h3>Light variant index 5:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color + '.5'" variant="light">Button</c-button>
          </div>
        </div>
        
        <!-- Subtle variant -->
        <div>
          <h3>Subtle variant:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color" variant="subtle">Button</c-button>
          </div>
        </div>
        
        <!-- Subtle variant with index 5 -->
        <div>
          <h3>Subtle variant index 5:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color + '.5'" variant="subtle">Button</c-button>
          </div>
        </div>
        
        <!-- Outline variant -->
        <div>
          <h3>Outline variant:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color" variant="outline">Button</c-button>
          </div>
        </div>
        
        <!-- Outline variant with index 4 -->
        <div>
          <h3>Outline variant index 4:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color + '.4'" variant="outline">Button</c-button>
          </div>
        </div>
        
        <!-- Dashed variant -->
        <div>
          <h3>Dashed variant:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color" variant="dashed">Button</c-button>
          </div>
        </div>
        
        <!-- Dashed variant with index 4 -->
        <div>
          <h3>Dashed variant index 4:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color + '.4'" variant="dashed">Button</c-button>
          </div>
        </div>
        
        <!-- Transparent variant -->
        <div>
          <h3>Transparent variant:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color" variant="transparent">Button</c-button>
          </div>
        </div>

        <!-- Transparent variant with index 4 -->
        <div>
          <h3>Transparent variant index 4:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color + '.4'" variant="transparent">Button</c-button>
          </div>
        </div>

        <!-- White variant (with dark background) -->
        <div style="background-color:rgba(0,0,0,0.5);padding: 16px; border-radius: 4px;">
          <h3>White variant:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color" variant="white">Button</c-button>
          </div>
        </div>

        <div style="background-color:rgba(0,0,0,0.5);padding: 16px; border-radius: 4px;">
          <h3>White variant index 4:</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;padding-top:8px;">
            <c-button v-for="color in colors" :key="color" :color="color + '.4'" variant="white">Button</c-button>
          </div>
        </div>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  render: () => ({
    components: { CButton },
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
    },
    template: `
      <div style="padding:40px;">
        <c-button full-width justify="space-between" variant="filled">
          <template #left-section>L</template>
          Button
          <template #right-section>R</template>
        </c-button>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { CButton },
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
    },
    template: `
      <div style="padding:40px;">
        <c-button size="xs">Button xs</c-button>
        <c-button size="sm">Button sm</c-button>
        <c-button size="md">Button md</c-button>
        <c-button size="lg">Button lg</c-button>
        <c-button size="xl">Button xl</c-button>
      </div>
      <div style="padding:40px;">
        <c-button size="compact-xs">Button compact xs</c-button>
        <c-button size="compact-sm">Button compact sm</c-button>
        <c-button size="compact-md">Button compact md</c-button>
        <c-button size="compact-lg">Button compact lg</c-button>
        <c-button size="compact-xl">Button compact xl</c-button>
      </div>
    `,
  }),
}

export const CssColor: Story = {
  render: () => ({
    components: { CButton },
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
    },
    template: `
      <div style="padding: 40px;">
        <h3>Filled variant</h3>
        <div>
          <c-button size="xl" radius="xl" color="#ff00ff" variant="filled">$$</c-button>
        </div>

        <h3>Light variant</h3>
        <div>
          <c-button size="xl" radius="xl" color="#ff00ff" variant="light">$$</c-button>
        </div>

        <h3>Outline variant</h3>
        <div>
          <c-button size="xl" radius="xl" color="#ff00ff" variant="outline">$$</c-button>
        </div>

        <h3>Dashed variant</h3>
        <div>
          <c-button size="xl" radius="xl" color="#ff00ff" variant="dashed">$$</c-button>
        </div>

        <h3>Subtle variant</h3>
        <div>
          <c-button size="xl" radius="xl" color="#ff00ff" variant="subtle">$$</c-button>
        </div>

        <h3>Transparent variant</h3>
        <div>
          <c-button size="xl" radius="xl" color="#ff00ff" variant="transparent">$$</c-button>
        </div>

        <h3>White variant</h3>
        <div style="background-color: rgba(0,0,0,0.5);">
          <c-button size="xl" radius="xl" color="#ff00ff" variant="white">$$</c-button>
        </div>
      </div>
    `,
  }),
}

export const GradientVariant: Story = {
  render: () => ({
    components: { CButton },
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
    },
    template: `
      <div style="padding:40px;display:flex;gap:40px;">
        <c-button size="lg" variant="gradient">$$</c-button>
        <c-button size="lg" variant="gradient" :gradient="{from: 'red', to: 'cyan'}">$$</c-button>
        <c-button size="lg" variant="gradient" :gradient="{from: '#ff00ff', to: '#00ff00', deg: 180}">$$</c-button>
      </div>
    `,
  }),
}

export const AsLink: Story = {
  render: () => ({
    components: { CButton },
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
    },
    template: `
      <div style="padding:40px">
        <c-button size="xl" tag="a" href="https://cck-ui.jackatlas.xyz" @click="(event) => event.preventDefault()">$$</c-button>
        <c-button size="xl" @click="(event) => event.preventDefault()">$$</c-button>
      </div>
    `,
  }),
}

export const Variables: Story = {
  render: () => ({
    components: { CButton },
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

      const varsFn = (_theme: CTheme, props: ButtonProps) => {
        const result: any = { root: {} }
        if (props.size === 'xl') {
          result.root['--ai-size'] = '12rem'
          result.root['--ai-bg'] = 'pink'
          result.root['--ai-hover'] = 'orange'
        }

        return result
      }

      return { varsFn }
    },
    template: `
      <div style="padding:40px">
        <c-button size="xl" :vars="varsFn" :style="{'--aasdsad': 'asdasd'}">$$</c-button>
      </div>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { CButton },
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
    },
    template: `
      <div style="padding:40px;display:flex;gap:20px;">
        <c-button loading size="xs">Button xs</c-button>
        <c-button loading size="sm">Button sm</c-button>
        <c-button loading size="md">Button md</c-button>
        <c-button loading size="lg">Button lg</c-button>
        <c-button loading size="xl">Button xl</c-button>
      </div>
    `,
  }),
}

export const ToggleLoading: Story = {
  render: () => ({
    components: { CButton },
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

      const loading = ref(false)
      const toggleLoading = () => {
        loading.value = !loading.value
      }

      return { loading, toggleLoading }
    },
    template: `
      <div style="padding:40px;display:flex;gap:20px;">
        <c-button size="lg" :loading="loading">Save to database</c-button>
        <c-button size="lg" @click="toggleLoading">Toggle loading state</c-button>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CButton },
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
    },
    template: `
      <div style="padding:40px;display:flex;gap:20px;">
        <c-button size="lg" disabled>$$</c-button>
      </div>
    `,
  }),
}

export const Sections: Story = {
  render: () => ({
    components: { CButton },
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
    },
    template: `
      <div style="padding:40px;display:flex;gap:20px;">
        <c-button>
          <template #left-section>L</template>
          With Left
        </c-button>
        <c-button>
          With Right
          <template #right-section>R</template>
        </c-button>
        <c-button>
          <template #left-section>L</template>
          With Both
          <template #right-section>R</template>
        </c-button>
      </div>
    `,
  }),
}

export const ButtonGroup: Story = {
  render: () => ({
    components: { CButton, CButtonGroup },
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
    },
    template: `
      <div style="padding:40px;display:flex;gap:20px;">
        <c-button size="lg">S</c-button>
        <c-button-group>
          <c-button size="lg">S</c-button>
        </c-button-group>

        <c-button-group :border-width="1">
          <c-button size="lg" tag="a" href="https://cck-ui.jackatlas.xyz">2</c-button>
          <c-button size="lg">1</c-button>
          <c-button size="lg">2</c-button>
          <c-button size="lg">3</c-button>
        </c-button-group>

        <c-button-group orientation="vertical">
          <c-button size="lg">1</c-button>
          <c-button size="lg">2</c-button>
          <c-button size="lg">2</c-button>
          <c-button size="lg">3</c-button>
        </c-button-group>
      </div>
    `,
  }),
}

export const Unstyled: Story = {
  render: () => ({
    components: { CButton },
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
    },
    template: `
      <div style="padding:40px;display:flex;gap:20px;">
        <c-button unstyled>Unstyled</c-button>
        <c-button unstyled loading>Unstyled</c-button>
      </div>
    `,
  }),
}

export const GroupSection: Story = {
  render: () => ({
    components: { CButton, CButtonGroup, CButtonGroupSection },
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
    },
    template: `
      <div style="padding:40px;display:flex;gap:20px;">
        <c-button-group>
          <c-button size="lg">-</c-button>
          <c-button-group-section size="lg" bg="var(--c-color-body)">118</c-button-group-section>
          <c-button size="lg">+</c-button>
        </c-button-group>
      </div>
    `,
  }),
}

// TODO
// export const WithFileButton: Story = {
//   render: () => ({
//     components: { CButton, CButtonGroup, CButtonGroupSection },
//     setup() {
//       const head = document.head
//       const viteStyles = Array.from(head.querySelectorAll('style')).filter(
//         (style) => style.dataset.viteDevId
//       )
//       let buttonStyle: HTMLStyleElement | null = null
//       let unstyledButtonStyle: HTMLStyleElement | null = null
//       viteStyles.forEach((style) => {
//         if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
//           buttonStyle = style
//         } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
//           unstyledButtonStyle = style
//         }
//       })

//       if (buttonStyle && unstyledButtonStyle) {
//         head.insertBefore(unstyledButtonStyle, buttonStyle)
//       }
//     },
//     template: `
//       <c-button-group>
//         <c-button variant="outline">Button 1</c-button>
//       </c-button-group>
//     `,
//   }),
// }
