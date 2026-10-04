import { FactoryPayload } from '../../factory'
import { useCckTheme } from '../../config-provider'
import { ClassNames, Styles } from '../styles-api.types'
import { resolveClassNames } from '../use-styles/get-class-name/resolve-class-names/resolve-class-names'
import { resolveStyles } from '../use-styles/get-style/resolve-styles/resolve-styles'

export interface UseResolvedStylesApiInput<Payload extends FactoryPayload> {
  classNames: ClassNames<Payload> | undefined
  styles: Styles<Payload> | undefined
  props: Record<string, any>
  stylesCtx?: Record<string, any>
}

export function useResolvedStylesApi<Payload extends FactoryPayload>({
  classNames,
  styles,
  props,
  stylesCtx,
}: UseResolvedStylesApiInput<Payload>) {
  const theme = useCckTheme()

  return {
    resolvedClassNames:
      classNames === undefined
        ? undefined
        : resolveClassNames({
            theme: theme.value,
            classNames,
            props,
            stylesCtx: stylesCtx || undefined,
          }),

    resolvedStyles:
      styles === undefined
        ? undefined
        : resolveStyles({
            theme: theme.value,
            styles,
            props,
            stylesCtx: stylesCtx || undefined,
          }),
  }
}
