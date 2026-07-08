import path from 'node:path'
import fs from 'fs-extra'
import { $ } from 'zx'

export async function generateDts(packagePath: string) {
  const tscUrl = await import.meta.resolve('typescript/bin/tsc')
  const tscPath = new URL(tscUrl).pathname
  await $({ cwd: packagePath })`node ${tscPath} --project tsconfig.build.json`

  await fs.copy(path.join(packagePath, 'lib/index.d.ts'), path.join(packagePath, 'lib/index.d.mts'))
}
