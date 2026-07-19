import { isPlainObject } from 'es-toolkit'
import type { SFCWithInstall } from './typescript'

const hasOwn = (obj: object, key: string | symbol): boolean => Object.hasOwn(obj, key)

export const withPropsDefaultSetter = (target: any) => {
  const _p = target.props
  const props = Array.isArray(_p) ? Object.fromEntries(_p.map((key) => [key, {}])) : _p

  target.setPropsDefaults = (defaults: Record<string, any>) => {
    if (!props) {
      return
    }

    for (const [key, value] of Object.entries(defaults)) {
      const prop = props[key]

      if (!hasOwn(props, key)) {
        continue
      }

      if (isPlainObject(prop)) {
        props[key] = {
          ...props,
          default: value,
        }
        continue
      }

      props[key] = {
        type: prop,
        default: value,
      }
    }

    target.props = props
  }
}

export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  ;(main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? [])]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  withPropsDefaultSetter(main)
  return main as SFCWithInstall<T> & E
}
