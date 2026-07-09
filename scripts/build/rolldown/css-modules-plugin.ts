import path from 'node:path'
import type { Plugin } from 'rolldown'
import postcss from 'postcss'
import postcssModules from 'postcss-modules'
import { generateScopedName } from 'hash-css-selector'
import { createLogger } from '../../utils/consola'

const logger = createLogger('css-module-plugin')

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
        logger.log('[generateBundle] no CSS collected, skipping')
        return
      }

      const uniqueMap = new Map<string, string>()
      for (const item of collectedCSS) {
        if (!uniqueMap.has(item.id)) {
          uniqueMap.set(item.id, item.css)
        }
      }
      const uniqueItems = Array.from(uniqueMap.entries()).map(([id, css]) => ({ id, css }))
      logger.log(`[generateBundle] after dedup: ${uniqueItems.length} unique files`)

      // 排序
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

      const sortedNames = sorted.map((item) => path.basename(item.id)).join(', ')
      logger.log(`[generateBundle] sorted order: ${sortedNames}`)

      const css = sorted.map((item) => item.css).join('\n')
      logger.log(`[generateBundle] combined CSS length: ${css.length} characters`)

      this.emitFile({
        type: 'asset',
        fileName: 'index.css',
        source: css,
      })
      logger.log('[generateBundle] emitted index.css')

      // 清空收集器
      collectedCSS = []
    },
  }
}
