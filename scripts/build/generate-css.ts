import path from 'node:path'
import { convertPathToPattern, glob } from 'tinyglobby'
import fs from 'fs-extra'
import { generateScopedName } from 'hash-css-selector'
import postcss from 'postcss'
import postcssModules from 'postcss-modules'
import { getPath } from '../utils/get-path'

function transformFileName(filePath: string) {
  return path.basename(filePath).replace('.module.css', '.css')
}

async function processFile(
  filePath: string,
  scopeBehaviour: 'local' | 'global',
  outputFolder: string
) {
  const result = await postcss([
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

export async function generateCSS() {
  await generateCSSLayers()
  await generateCoreCSS()
}
