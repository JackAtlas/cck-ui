import path from 'node:path'
import { convertPathToPattern, glob } from 'tinyglobby'
import fs from 'fs-extra'
import { generateScopedName } from 'hash-css-selector'
import postcss from 'postcss'
import postcssPresetCck from 'postcss-preset-cck'
import postcssModules from 'postcss-modules'
import { getPath } from '../utils/get-path'
import { createLogger } from '../utils/consola'

const logger = createLogger('generate-css')

function transformFileName(filePath: string) {
  return path.basename(filePath).replace('.module.css', '.css')
}

async function processFile(
  filePath: string,
  scopeBehaviour: 'local' | 'global',
  outputFolder: string
) {
  const result = await postcss([
    ...postcssPresetCck({
      autoRem: true,
    }),
    postcssModules({ generateScopedName, getJSON: () => {}, scopeBehaviour }),
  ]).process(fs.readFileSync(filePath, 'utf-8'), {
    from: path.basename(filePath),
  })

  const fileName = transformFileName(filePath)
  await fs.writeFile(path.join(outputFolder, fileName), result.css)
  await fs.writeFile(
    path.join(outputFolder, fileName.replace('.css', '.layer.css')),
    `@layer cck {${result.css}}`
  )
}

// Generates styles.layers.css files for each @cck-ui/* component
async function generateCSSLayers() {
  const packagesPath = convertPathToPattern(getPath('packages'))
  const files = await glob(`${packagesPath}/*/*/styles.css`)

  files.forEach((filePath) => {
    const directory = path.normalize(path.join(filePath, '..'))
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const fileContentWithLayer = `@layer cck {${fileContent}}`
    fs.writeFileSync(path.join(directory, 'styles.layer.css'), fileContentWithLayer)
  })
}

// Generates individual css files for each @cck-ui/core component
export async function generateCoreCSS() {
  const packagesPath = convertPathToPattern(getPath('packages'))
  const files = await glob(`${packagesPath}/@cck-ui/core/src/**/*.css`)
  const modules = files.filter((file) => file.endsWith('.module.css'))
  const global = files.filter(
    (file) =>
      file.endsWith('global.css') ||
      file.endsWith('baseline.css') ||
      file.endsWith('default-css-variables.css')
  )

  const outputFolder = getPath('packages/@cck-ui/core/styles')

  await fs.ensureDir(outputFolder)

  modules.forEach((file) => processFile(file, 'local', outputFolder))
  global.forEach((file) => processFile(file, 'global', outputFolder))
}

export async function generateCombinedCSS() {
  const rootDir = getPath('packages/@cck-ui/core')
  const stylesCssPath = path.join(rootDir, 'styles.css')

  if (await fs.pathExists(stylesCssPath)) {
    logger.log('[generate css] styles.css already exists, skipping merge from styles/')
  } else {
    logger.log('[generate css] styles.css not exists, combining all css from styles/')
    const coreStylesDir = path.join(rootDir, 'styles')
    if (await fs.pathExists(coreStylesDir)) {
      const files = await glob('*.css', { cwd: coreStylesDir })
      const cssFiles = files.filter((f) => !f.endsWith('.layer.css'))

      const priorityMap: Record<string, number> = {
        'baseline.css': 1,
        'global.css': 2,
        'default-css-variables.css': 3,
        'unstyled-button.css': 4,
        'button.css': 5,
      }

      cssFiles.sort((a, b) => {
        const aPriority = priorityMap[a] ?? 10
        const bPriority = priorityMap[b] ?? 10
        if (aPriority !== bPriority) {
          return aPriority - bPriority
        }
        return a.localeCompare(b)
      })

      if (cssFiles.length > 0) {
        const contents = await Promise.all(
          cssFiles.map((f) => fs.readFile(path.join(coreStylesDir, f), 'utf-8'))
        )
        const combined = contents.join('\n')
        await fs.writeFile(stylesCssPath, combined)
        await fs.writeFile(path.join(rootDir, 'styles.layer.css'), `@layer cck {${combined}}`)
      }
    }
  }
}

export async function generateCSS() {
  await generateCSSLayers()
  await generateCoreCSS()
  await generateCombinedCSS()
}
