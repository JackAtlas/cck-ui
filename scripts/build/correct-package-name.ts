import path from 'node:path'
import chalk from 'chalk'
import { closest, distance } from 'fastest-levenshtein'
import fs from 'fs-extra'
import { getPath } from '../utils/get-path'

function getValidShortNames(): string[] {
  const basePath = getPath('packages')
  const names: string[] = []

  const cckDir = path.join(basePath, '@cck-ui')
  if (fs.pathExistsSync(cckDir)) {
    for (const name of fs.readdirSync(cckDir)) {
      if (fs.lstatSync(path.join(cckDir, name)).isDirectory()) {
        names.push(name)
      }
    }
  }

  names.push('all')
  return names
}

export function correctPackagesName(input: string): string {
  if (input.startsWith('@')) {
    return input
  }

  const validNames = getValidShortNames()

  if (validNames.includes(input)) {
    return input
  }

  const match = closest(input, validNames)
  const dist = distance(input, match)
  const maxDistance = Math.max(2, Math.floor(input.length / 2))

  if (dist <= maxDistance) {
    process.stdout.write(
      chalk.yellow(`Autocorrected "${input}" → "${match}"\n`)
    )
    return match
  }

  return input
}
