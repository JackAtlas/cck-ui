import { computed, defineComponent, h } from 'vue'
import { CThemeComponent } from '../../config-provider'
import { VarsResolver } from '../../styles-api'

export function withExtend<T>(
  component: T
): T & { extend: (config: CThemeComponent) => CThemeComponent } {
  ;(component as any).extend = (config: CThemeComponent) => config
  return component as T & { extend: (config: CThemeComponent) => CThemeComponent }
}

export const withClasses = <T, C extends Record<string, string>>(
  component: T,
  classes: C
): T & { classes: C } => {
  ;(component as any).classes = classes
  return component as T & { classes: C }
}

export const withVarsResolver = <T, V extends VarsResolver<any>>(
  component: T,
  varsResolver: V
): T & { varsResolver: V } => {
  ;(component as any).varsResolver = varsResolver
  return component as T & { varsResolver: V }
}

export const withPropsFactory = <T extends Record<string, any>>(component: T) => {
  ;(component as any).withProps = (defaultProps: Partial<T>) => {
    return defineComponent({
      name: `WithProps(${(component as any).name || 'Component'})`,
      props: (component as any).props || {},
      setup(props, { slots }) {
        const mergedProps = computed(() => ({
          ...defaultProps,
          ...props,
        }))

        return () => h(component, mergedProps.value, slots)
      },
    })
  }

  return component as T & { withProps: (defaultProps: Partial<T>) => any }
}
