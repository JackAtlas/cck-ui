import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { styleText } from 'node:util'
import consola from 'consola'
import { chunk } from 'es-toolkit'
import { transform } from 'lightningcss'
import { glob } from 'tinyglobby'
import { cuOutput, execCommand } from '@cck-ui/build-utils'
import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { compileAsync } from 'sass-embedded'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(cuOutput, 'theme-slate')

async function compress(filename: string, css: string) {
  const result = transform({
    filename,
    code: Buffer.from(css),
    minify: true,
    sourceMap: false,
    targets: {
      chrome: 85 << 16,
      firefox: 79 << 16,
      safari: (14 << 16) | (1 << 8),
      edge: 85 << 16
    }
  })
  return result.code
}

const processfiles = async (scssFiles: string[]) => {
  const noCuPrefixFile = /(index|base|display)/
  await mkdir(distFolder, { recursive: true })
  for (const scssFile of scssFiles) {
    const fullPath = path.resolve(__dirname, scssFile)
    const baseName = path.basename(scssFile, '.scss')

    const cssResult = await compileAsync(fullPath)
    const compressed = await compress(baseName, cssResult.css)

    const outputName = noCuPrefixFile.test(baseName)
      ? `${baseName}.css`
      : `cu-${baseName}.css`

    const outputPath = path.join(distFolder, outputName)
    await writeFile(outputPath, compressed)

    consola.success(
      `${styleText('cyan', outputName)}: ${styleText('yellow', `${cssResult.css.length / 1000}`)} KB -> ${styleText('green', `${compressed.length / 1000}`)} KB`
    )
  }
}

async function buildThemeSlate() {
  const scssFile = await glob('src/*.scss', {
    cwd: __dirname,
    absolute: true
  })
  const chunks = chunk(scssFile, Math.ceil(scssFile.length / 5))
  return Promise.all(chunks.map(processfiles))
}

async function buildDarkCssVars() {
  const darkFile = path.resolve(__dirname, 'src/dark/css-vars.scss')
  const cssResult = await compileAsync(darkFile)
  const compressed = await compress(darkFile, cssResult.css)

  const outputDir = path.join(distFolder, 'dark')
  await mkdir(outputDir, { recursive: true })
  await writeFile(path.join(outputDir, 'css-vars.css'), compressed)
}

async function copyThemeSlateBundle() {
  const files = await glob(['dist/**/*'], { cwd: __dirname })
  for (const file of files) {
    const source = path.resolve(__dirname, file)
    const dest = path.resolve(distBundle, path.relative('dist', file))
    await mkdir(path.dirname(dest), { recursive: true })
    await copyFile(source, dest)
  }
}

async function copyThemeSlateSource() {
  const destDir = path.resolve(distBundle, 'src')
  const files = await glob(['src/**/*'], { cwd: __dirname })

  for (const file of files) {
    const source = path.resolve(__dirname, file)
    const dest = path.resolve(destDir, path.relative('src', file))
    await mkdir(path.dirname(dest), { recursive: true })
    await copyFile(source, dest)
  }
}

const buildTheme = async () => {
  await execCommand(copyThemeSlateSource)
  await Promise.all([
    execCommand(buildThemeSlate),
    execCommand(buildDarkCssVars)
  ])
  await execCommand(copyThemeSlateBundle)
}

function main() {
  return execCommand(buildTheme)
}

main()
