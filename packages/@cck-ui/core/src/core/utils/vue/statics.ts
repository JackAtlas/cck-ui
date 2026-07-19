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
