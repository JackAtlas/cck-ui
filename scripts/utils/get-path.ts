import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.resolve(__dirname, '../..')

export function getPath(filePath: string) {
  return path.resolve(PROJECT_ROOT, filePath)
}

export function getPaths(filePaths: string[]) {
  return filePaths.map(getPath)
}
