import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {} from 'rolldown'
import { CckUiAlias } from '../plugins/cck-ui-alias'
import { SupplyValidator } from '../plugins/supply-validator'
import { execCommand } from '../../../build-utils/src'

const plugins = [CckUiAlias(), vue(), vueJsx(), SupplyValidator()]

async function buildModulesComponents() {}

async function buildModulesStyles() {}

export const buildModules = () => {
  Promise.all([
    execCommand(buildModulesComponents),
    execCommand(buildModulesStyles)
  ])
}
