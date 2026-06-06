import { styleText } from 'node:util'
import consola from 'consola'

type Awaitable<T> = Promise<T> | T

export function errorAndExit(err: Error): never {
  consola.error(err)
  process.exit(1)
}

export async function execCommand<T extends () => Awaitable<any>>(
  fnc: T,
  overrideName?: string
) {
  const commandName = styleText('cyan', overrideName || fnc.name)
  try {
    const startTime = performance.now()
    consola.info(`Starting '${commandName}'...`)
    await fnc()
    const elasedTime = performance.now() - startTime
    const suffixTimelog =
      elasedTime < 100
        ? `${elasedTime.toFixed(2)}ms`
        : `${(elasedTime / 1000).toFixed(2)}s`
    consola.info(
      `Ending '${commandName}' ${styleText('magenta', suffixTimelog)}`
    )
  } catch (e: any) {
    errorAndExit(e)
  }
}
