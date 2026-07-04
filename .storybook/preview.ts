import type { Preview } from '@storybook/vue3-vite'
import { DEFAULT_THEME } from '../packages/@cck-ui/core/src/core/index.js'
import ConfigProvider from '../packages/@cck-ui/core/src/core/config-provider/config-provider.vue'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (story) => ({
      components: { story, ConfigProvider },
      setup() {
        return { DEFAULT_THEME }
      },
      template: `
        <config-provider :theme="DEFAULT_THEME">
          <story />
        </config-provider>
      `,
    }),
  ],
}

export default preview
