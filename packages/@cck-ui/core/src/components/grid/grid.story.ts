import { Meta, StoryObj } from '@storybook/vue3-vite'
import { CCol, CGrid } from '.'
import { CButton } from '..'

const meta = {
  title: 'Grid',
  component: CGrid,
  render: () => ({}),
} satisfies Meta<typeof CGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CButton, CCol, CGrid },
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
      <div style="padding:0;">
        <c-grid bg="pink.3">
          <c-col :span="{sm: 6, md: 3}">
            <c-button variant="filled" full-width>First</c-button>
          </c-col>
          <c-col :span="{sm: 6, md: 3}">
            <c-button variant="filled" full-width>Second</c-button>
          </c-col>
          <c-col :span="{sm: 6, md: 3}">
            <c-button variant="filled" full-width>Third</c-button>
          </c-col>
          <c-col :span="{sm: 6, md: 3}">
            <c-button variant="filled" full-width>Forth</c-button>
          </c-col>
        </c-grid>
      </div>
    `,
  }),
}

export const ContainerBreakpoints: Story = {
  render: () => ({
    components: { CButton, CCol, CGrid },
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

      const gap = { base: 10, xs: 30, lg: 50 }
      const breakpoints = { xs: '400px', sm: '600px', md: '800px', lg: '1000px', xl: '1200px' }

      return { gap, breakpoints }
    },
    template: `
      <div style="padding:40px;resize:horizontal;overflow:hidden;">
        <c-grid type="container" :gap="gap" :breakpoints="breakpoints">
          <c-col :span="{sm: 6, md: 3}">
            <c-button variant="filled" full-width>First</c-button>
          </c-col>
          <c-col :span="{sm: 6, md: 3}">
            <c-button variant="filled" full-width>Second</c-button>
          </c-col>
          <c-col :span="{sm: 6, md: 3}">
            <c-button variant="filled" full-width>Third</c-button>
          </c-col>
          <c-col :span="{sm: 6, md: 3}">
            <c-button variant="filled" full-width>Forth</c-button>
          </c-col>
        </c-grid>
      </div>
    `,
  }),
}

export const ContentAuto: Story = {
  render: () => ({
    components: { CButton, CCol, CGrid },
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
      <div style="padding:0;">
        <c-grid bg="pink.3">
          <c-col :span="{ base: 'auto', sm: 'content' }">
            <c-button variant="filled" full-width>First</c-button>
          </c-col>
        </c-grid>
      </div>
    `,
  }),
}

export const NestedAutoGrids: Story = {
  render: () => ({
    components: { CCol, CGrid },
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
      <div>
        <c-grid>
          <c-col span="1" bg="lightyellow">
            First
          </c-col>
          <c-col span="auto" bg="seagreen">
            Second
          </c-col>
        </c-grid>

        <c-grid>
          <c-col span="6">
            <c-grid bg="red">
              <c-col span="1" bg="lightyellow">First</c-col>
              <c-col span="auto" bg="seagreen">Second</c-col>
            </c-grid>
          </c-col>
          <c-col span="6">Not nested</c-col>
        </c-grid>
      </div>
    `,
  }),
}

export const Offset: Story = {
  render: () => ({
    components: { CButton, CCol, CGrid },
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
      <div style="padding:0;">
        <c-grid columns="12" bg="pink.3">
          <c-col span="4">
            <c-button variant="filled" full-width>First</c-button>
          </c-col>
          <c-col span="4" :offset="{ sm: 2, md: 4 }">
            <c-button variant="filled" full-width>Second</c-button>
          </c-col>
        </c-grid>
      </div>
    `,
  }),
}

export const Order: Story = {
  render: () => ({
    components: { CButton, CCol, CGrid },
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
      <div style="padding:0;">
        <c-grid columns="12" bg="pink.3">
          <c-col span="4" :order="{ base: 2, sm: 1 }">
            <c-button variant="filled" full-width>First</c-button>
          </c-col>
          <c-col span="4" :order="{ base: 1, sm: 2 }">
            <c-button variant="filled" full-width>Second</c-button>
          </c-col>
        </c-grid>
      </div>
    `,
  }),
}

// TODO
// export const PxBreakpoint: Story = {}
