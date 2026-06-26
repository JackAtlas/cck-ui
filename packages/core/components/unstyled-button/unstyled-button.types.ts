import {
  BoxComponentProps,
  PolymorphicFactory,
  StylesApiProps
} from '@cck-ui/core'

export type UnstyledButtonStylesNames = 'root'

export type UnstyledButtonFactory = PolymorphicFactory<{
  props: UnstyledButtonProps
  stylesNames: UnstyledButtonStylesNames
  defaultComponent: 'button'
  defaultRef: HTMLButtonElement
}>

interface _UnstyledButtonProps
  extends
    Omit<BoxComponentProps, 'vars' | 'variant'>,
    StylesApiProps<UnstyledButtonFactory> {
  __staticSelector?: string
}

export type UnstyledButtonProps = _UnstyledButtonProps & {
  tag?: any
}
