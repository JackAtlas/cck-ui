import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

export default defineConfig({
  plugins: [Vue(), VueJsx()],
  resolve: {
    alias: {
      '@cck-ui-tests/core': resolve(__dirname, 'packages/@cck-ui-tests/core/src'),
    },
  },
  test: {
    name: 'unit',
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    reporters: ['default'],
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      exclude: ['play/**', '.storybook/**', 'scripts/**'],
    },
  },
})
