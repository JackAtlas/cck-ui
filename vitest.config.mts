import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [Vue(), VueJsx()],
  optimizeDeps: {
    noDiscovery: true,
    include: [],
  },
  test: {
    name: 'unit',
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: ['vi-axe', './vitest.setup.ts'],
    reporters: ['default'],
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      exclude: ['play/**', '.storybook/**', 'scripts/**'],
    },
  },
})
