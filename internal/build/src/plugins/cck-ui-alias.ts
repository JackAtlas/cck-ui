import { PKG_NAME, PKG_PREFIX } from '@cck-ui/build-constants'
import type { Plugin } from 'rolldown'

export function CckUiAlias(): Plugin {
  const themeSlate = 'theme-slate'
  const sourceThemeSlate = `${PKG_PREFIX}/${themeSlate}` as const
  const bundleThemeSlate = `${PKG_NAME}/${themeSlate}` as const

  return {
    name: 'cck-ui-alias-plugin',
    resolveId: {
      filter: {
        id: /^@cck-ui\/theme-slate/
      },
      handler(id) {
        return {
          id: id.replaceAll(sourceThemeSlate, bundleThemeSlate),
          external: 'absolute'
        }
      }
    }
  }
}
