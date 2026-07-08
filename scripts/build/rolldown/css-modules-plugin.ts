import type { Plugin } from 'rolldown'
import postcss from 'postcss'
import postcssModules from 'postcss-modules'
import { generateScopedName } from 'hash-css-selector'

let collectedCSS: string[] = []

export function cssModulesPlugin(): Plugin {
  return {
    name: 'css-module',

    async transform(code, id) {
      if (!id.endsWith('.css')) {
        return null
      }

      if (!id.endsWith('.module.css')) {
        collectedCSS.push(code)
        return {
          code: `export default {}`,
          map: null,
        }
      }

      let classMap: Record<string, string> = {}

      const result = await postcss([
        postcssModules({
          generateScopedName,
          getJSON(_, json) {
            classMap = json
          },
        }),
      ]).process(code, { from: id })

      collectedCSS.push(result.css)

      return {
        code: `export default ${JSON.stringify(classMap)}`,
        map: null,
      }
    },

    generateBundle() {
      if (collectedCSS.length === 0) {
        return
      }

      const css = collectedCSS.join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'index.css',
        source: css,
      })

      collectedCSS = []
    },
  }
}
