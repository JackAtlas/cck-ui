import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

export default defineConfig({
  plugins: [Vue(), VueJsx()],
  resolve: {
    alias: {
      '@cck-ui/core': resolve(__dirname, 'packages/@cck-ui/core/src'),
      '@cck-ui/hooks': resolve(__dirname, 'packages/@cck-ui/hooks/src'),
      '@cck-ui-tests/core': resolve(__dirname, 'packages/@cck-ui-tests/core/src'),
    },
  },
  optimizeDeps: {
    include: ['@cck-ui/core', '@cck-ui/hooks'],
  },
  test: {
    name: 'unit',
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    include: ['packages/**/*.test.ts'],
    execArgv: ['--no-experimental-webstorage'],
    setupFiles: ['./vitest.setup.ts'],
    deps: {
      optimizer: {
        web: {
          include: ['@cck-ui/core', '@cck-ui/hooks'],
        },
      },
    },
  },
})
