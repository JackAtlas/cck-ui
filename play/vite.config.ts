import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

import presetCck from 'postcss-preset-cck'
import simpleVars from 'postcss-simple-vars'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@cck-ui/core': path.resolve(__dirname, '../packages/@cck-ui/core/src/index.ts'),
      '@cck-ui/hooks': path.resolve(__dirname, '../packages/@cck-ui/hooks/src/index.ts'),
    },
  },
  css: {
    postcss: {
      plugins: [
        ...presetCck({ autoRem: true }),
        simpleVars({
          variables: {
            'c-breakpoint-xs': '36em',
            'c-breakpoint-sm': '48em',
            'c-breakpoint-md': '62em',
            'c-breakpoint-lg': '75em',
            'c-breakpoint-xl': '88em',
          },
        }),
      ],
    },
  },
})
