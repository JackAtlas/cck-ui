import { computed, ComputedRef, getCurrentInstance } from 'vue'
import { useCckTheme } from '../config-provider.context'

export interface UseComponentPropsOptions<
  T extends Record<string, any>,
  U extends Partial<T> | null = {},
> {
  component: string | (string | undefined)[]
  defaultProps: U
  props: T

  /**
   * The `Boolean` absent props will be cast to `false` by `defineProps`.
   * See in Vue documentation: https://vuejs.org/guide/components/props.html
   * So we have to double check these props from instance.
   */
  booleanProps?: (keyof T)[]
}

function toKebab(s: string) {
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
}

export function useComponentProps<T extends Record<string, any>, U extends Partial<T> | null = {}>(
  options: UseComponentPropsOptions<T, U>
): ComputedRef<T> {
  const { component, defaultProps = {} as U, props, booleanProps = [] } = options

  const theme = useCckTheme()
  const names = Array.isArray(component) ? component : [component]
  const instance = getCurrentInstance()

  const implicitFalseProps = computed(() => {
    const vnodeProps = (instance?.vnode.props as Record<string, any>) || {}
    const result = new Set<string>()
    for (const key of booleanProps) {
      const k = key as string
      const kebab = toKebab(k)
      const isPassed = k in vnodeProps || kebab in vnodeProps
      if (!isPassed && props[k] === false) {
        result.add(k)
      }
    }
    return result
  })

  const contextProps = computed(() => {
    const components = theme.value.components
    if (!components) {
      return {} as Partial<T>
    }

    let result: Partial<T> = {}
    for (const name of names) {
      if (name) {
        const config = components[name]
        if (config?.defaultProps) {
          result = { ...result, ...config.defaultProps }
        }
      }
    }
    return result
  })

  const mergedProps = computed(() => {
    const filteredProps: Partial<T> = {}
    const implicit = implicitFalseProps.value
    for (const key in props) {
      if (props[key] !== undefined && !implicit.has(key)) {
        filteredProps[key] = props[key]
      }
    }
    return {
      ...(defaultProps as any),
      ...contextProps.value,
      ...filteredProps,
    }
  }) as ComputedRef<T>

  return mergedProps
}
