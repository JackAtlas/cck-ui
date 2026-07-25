import { computed, ComputedRef } from 'vue'
import { useCckTheme } from '../config-provider.context'

export interface UseComponentPropsOptions<
  T extends Record<string, any>,
  U extends Partial<T> | null = {},
> {
  component: string | (string | undefined)[]
  defaultProps: U
  props: T
}

export function useComponentProps<T extends Record<string, any>, U extends Partial<T> | null = {}>(
  options: UseComponentPropsOptions<T, U>
): ComputedRef<T> {
  const { component, defaultProps = {} as U, props } = options

  const theme = useCckTheme()
  const names = Array.isArray(component) ? component : [component]

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
    for (const key in props) {
      if (props[key] !== undefined) {
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
