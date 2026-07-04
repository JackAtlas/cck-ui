import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@cck-ui/hooks': path.resolve(__dirname, './packages/@cck-ui/hooks/src/index.ts'),
    },
  },
})
