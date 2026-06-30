import consola from 'consola'

export const createLogger = (scope: string) => {
  return consola.withTag(scope)
}
