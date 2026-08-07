import { Meta, StoryObj } from '@storybook/vue3-vite'
import CAlert from '.'
import { CckConfigProvider } from '../../core'

const meta = {
  title: 'Alert',
  component: CAlert,
} satisfies Meta<typeof CAlert>

export default meta

type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => ({
    components: { CAlert },
    setup() {
      const variants = [
        'default',
        'filled',
        'outline',
        'dashed',
        'white',
        'transparent',
        'light',
      ] as const
      return { variants }
    },
    template: `
      <div style="max-width: 500px; margin: auto; padding: 40px; background: rgba(0, 0, 0, 0.1);">
        <c-alert
          v-for="variant in variants"
          :key="variant"
          :variant="variant"
          color="red"
          with-close-button
          mt="xl"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </template>
          <template #title>Bummer!</template>
          Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
        </c-alert>
      </div>
    `,
  }),
}

export const AutoContrast: Story = {
  render: () => ({
    components: { CAlert },
    setup() {
      const colors = Array.from({ length: 10 }, (_, i) => `yellow.${i}`)
      return { colors }
    },
    template: `
      <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px; padding: 40px;">
        <c-alert
          v-for="color in colors"
          :key="color"
          :color="color"
          variant="filled"
          with-close-button
          auto-contrast
          mt="xl"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </template>
          <template #title>Bummer!</template>
          Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
        </c-alert>
      </div>
    `,
  }),
}

export const Unstyled: Story = {
  render: () => ({
    components: { CAlert },
    template: `
      <div style="max-width: 500px; margin: auto; padding: 40px;">
        <c-alert
          title="Bummer!"
          color="red"
          variant="light"
          with-close-button
          unstyled
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </template>
          <template #title>Bummer!</template>
          Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
        </c-alert>
      </div>
    `,
  }),
}

export const WithoutDescription: Story = {
  render: () => ({
    components: { CAlert },
    template: `
      <div style="max-width: 500px; margin: auto; padding: 40px;">
        <c-alert color="red" variant="light" with-close-button>
          <template #icon>$</template>
          <template #title>Bummer!</template>
        </c-alert>
      </div>
    `,
  }),
}

export const CSSVariables: Story = {
  render: () => ({
    components: { CAlert, CckConfigProvider },
    setup() {
      return {
        theme: {
          components: {
            CAlert: {
              defaultProps: {
                color: 'grape',
              },
            },
          },
        },
      }
    },
    template: `
      <cck-config-provider :theme="theme" with-static-classes with-global-classes with-css-variables>
        <div style="max-width: 500px; margin: auto; padding: 40px;">
          <c-alert with-close-button>
            <template #title>Bummer!</template>
            Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
          </c-alert>
        </div>
      </cck-config-provider>
    `,
  }),
}
