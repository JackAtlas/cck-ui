import path from 'node:path'
import type { Plugin } from 'rolldown'
import postcss from 'postcss'
import postcssModules from 'postcss-modules'
import { generateScopedName } from 'hash-css-selector'

let collectedCSS: { id: string; css: string }[] = []

const GLOBAL_STYLES = ['baseline.css', 'global.css', 'default-css-variables.css']

export function cssModulesPlugin(): Plugin {
  return {
    name: 'css-module',

    async transform(code, id) {
      if (!id.endsWith('.css')) {
        return null
      }

      if (!id.endsWith('.module.css')) {
        collectedCSS.push({ id, css: code })
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

      collectedCSS.push({ id, css: result.css })

      return {
        code: `export default ${JSON.stringify(classMap)}`,
        map: null,
      }
    },

    generateBundle() {
      if (collectedCSS.length === 0) {
        return
      }

      const uniqueMap = new Map<string, string>()
      for (const item of collectedCSS) {
        if (!uniqueMap.has(item.id)) {
          uniqueMap.set(item.id, item.css)
        }
      }

      const uniqueItems = Array.from(uniqueMap.entries()).map(([id, css]) => ({ id, css }))

      const sorted = uniqueItems.sort((a, b) => {
        const aBase = path.basename(a.id)
        const bBase = path.basename(b.id)

        const aIsGlobal = GLOBAL_STYLES.includes(aBase)
        const bIsGlobal = GLOBAL_STYLES.includes(bBase)
        if (aIsGlobal && !bIsGlobal) {
          return -1
        } else if (!aIsGlobal && bIsGlobal) {
          return 1
        } else if (aIsGlobal && bIsGlobal) {
          return GLOBAL_STYLES.indexOf(aBase) - GLOBAL_STYLES.indexOf(bBase)
        }

        if (aBase === 'unstyled-button.module.css') {
          return -1
        } else if (aBase === 'button.module.css') {
          return 1
        }
        if (bBase === 'unstyled-button.module.css') {
          return 1
        } else if (bBase === 'button.module.css') {
          return -1
        }

        return aBase.localeCompare(bBase)
      })

      const css = sorted.map((item) => item.css).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'index.css',
        source: css,
      })

      collectedCSS = []
    },
  }
}
