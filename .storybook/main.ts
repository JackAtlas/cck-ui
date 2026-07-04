import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/vue3-vite'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { mergeConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const { argv } = yargs(hideBin(process.argv))

if (argv instanceof Promise) {
  throw new Error('Failed to load cli arguments')
}

const getPath = (storyPath: string) => path.resolve(process.cwd(), storyPath).replace(/\\/g, '/')

function getStoryPaths(fileName: string | number = '*') {
  return [getPath(`packages/@cck-ui/*/src/**/${fileName}.story.@(ts|tsx)`)]
}

const storiesPath = !argv._[1]
  ? [...getStoryPaths()]
  : [...getStoryPaths(argv._[1]), ...getStoryPaths(`${argv._[1]}.demos`)]

const config: StorybookConfig = {
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
    enableCrashReports: false,
  },
  features: {
    sidebarOnboardingChecklist: false,
  },
  stories: storiesPath,
  addons: [],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@cck-ui/hooks': path.resolve(__dirname, '../packages/@cck-ui/hooks/src'),
        },
      },
    })
  },
}

export default config
