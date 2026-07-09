import type { Plugin } from 'rolldown'
import postcss from 'postcss'
import postcssModules from 'postcss-modules'
import { generateScopedName } from 'hash-css-selector'

export function cssModulesPlugin(): Plugin {
  return {
    name: 'css-module',

    async transform(code, id) {
      if (!id.endsWith('.css')) {
        return null
      }

      if (!id.endsWith('.module.css')) {
        return {
          code: `export default {}`,
          map: null,
        }
      }

      let classMap: Record<string, string> = {}

      await postcss([
        postcssModules({
          generateScopedName,
          getJSON(_, json) {
            classMap = json
          },
        }),
      ]).process(code, { from: id })

      return {
        code: `export default ${JSON.stringify(classMap)}`,
        map: null,
      }
    },
  }
}
