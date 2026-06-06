import { createApp } from 'vue'
import '@cck-ui/theme-slate/src/var.scss'
import '@cck-ui/theme-slate/src/dark/css-vars.scss'

import { CIcon } from '@cck-ui/components'

import App from './App.vue'

const plugins = [CIcon]
const app = createApp(App)

plugins.forEach((plugin) => {
  app.use(plugin)
})
app.mount('#app')
