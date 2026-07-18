import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

export default defineConfig({
  plugins: [Vue(), VueJsx()],
  resolve: {
    alias: {
      '@cck-ui/core': resolve(__dirname, 'packages/@cck-ui/core/src'),
      '@cck-ui-tests/core': resolve(__dirname, 'packages/@cck-ui-tests/core/src'),
    },
  },
  test: {
    name: 'unit',
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    include: ['packages/**/*.test.ts'],
    execArgv: ['--no-experimental-webstorage'],
    setupFiles: ['./vitest.setup.ts'],
  },
})
