import { toValue } from 'vue'
import { CTheme, useCckStylesTransform } from '../../config-provider'

interface UseTransformedStylesInput {
  props: Record<string, any>
  stylesCtx: Record<string, any> | undefined
  themeName: string[]
  theme: CTheme
}

export function useStylesTransform({
  props,
  stylesCtx,
  themeName,
  theme,
}: UseTransformedStylesInput) {
  const stylesTransform = useCckStylesTransform()?.()

  const getTransformedStyles = (styles: any[]) => {
    if (!stylesTransform) {
      return []
    }

    const currentProps = toValue(props)
    const currentCtx = toValue(stylesCtx)

    const transformedStyles = styles.map((style) =>
      stylesTransform(style, { props: currentProps, theme, ctx: currentCtx })
    )

    return [
      ...transformedStyles,
      ...themeName.map((n) =>
        stylesTransform(theme.components[n]?.styles, {
          props: currentProps,
          theme,
          ctx: currentCtx,
        })
      ),
    ].filter(Boolean) as Record<string, string>[]
  }

  return {
    getTransformedStyles,
    withStylesTransform: !!stylesTransform,
  }
}
