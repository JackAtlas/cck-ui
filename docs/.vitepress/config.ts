import { defineConfig } from 'vitepress'
import { resolve } from 'node:path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'CCK UI',
  description: 'Another Vue 3 Components Library',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/en-US/component/button.md' }
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Button', link: '/en-US/component/button.md' },
          { text: 'Icon', link: '/en-US/component/icon.md' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JackAtlas/cck-ui' }
    ]
  },
  vite: {
    resolve: {
      alias: {
        'cck-ui': resolve(__dirname, '../../packages/cck-ui/index.ts'),
        '@cck-ui/theme-slate': resolve(
          __dirname,
          '../../packages/theme-slate/src/index.scss'
        )
      }
    }
  }
})
