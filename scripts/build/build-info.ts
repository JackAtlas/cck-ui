import path from 'node:path'
import fs from 'fs-extra'
import { getPath } from '../utils/get-path'

export interface BuildInfo {
  [packageName: string]: string
}

function getBuildInfoPath(): string {
  return path.join(getPath('.'), '.buildinfo.json')
}

export function readBuildInfo(): BuildInfo {
  const infoPath = getBuildInfoPath()
  if (fs.pathExistsSync(infoPath)) {
    return fs.readJSONSync(infoPath)
  }
  return {}
}

export function writeBuildInfo(info: BuildInfo): void {
  fs.writeJSONSync(getBuildInfoPath(), info, { spaces: 2 })
}
