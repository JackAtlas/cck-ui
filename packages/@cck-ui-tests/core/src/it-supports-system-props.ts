import { computed, defineComponent, h, ref } from 'vue'
import { itHasClasses } from './shared/it-has-classes'
import { itHasExtend } from './shared/it-has-extend'
import { itHasStaticVarsResolver } from './shared/it-has-static-vars-resolver'
import { itHasWithProps } from './shared/it-has-withProps'
import { itIsPolymorphic } from './shared/it-is-polymorphic'
import { itRendersChildren } from './shared/it-renders-children'
import { itSupportsClassName } from './shared/it-supports-classname'
import { itSupportsHiddenVisible } from './shared/it-supports-hidden-visible'
import { itSupportsId } from './shared/it-supports-id'
import { itSupportsLightDarkHidden } from './shared/it-supports-light-dark-hidden'
import { itSupportsMod } from './shared/it-supports-mod'
import { itSupportsOthers } from './shared/it-supports-others'
import { itSupportsProviderDefaultProps } from './shared/it-supports-provider-default-props'
import { itSupportsRef } from './shared/it-supports-ref'
import { itSupportsSize } from './shared/it-supports-size'
import { itSupportsStyle } from './shared/it-supports-style'
import { itSupportsStylesApi } from './shared/it-supports-styles-api'
import { itSupportsVariant } from './shared/it-supports-variant'
import { itSupportsBackgroundProps } from './style-props/it-supports-background-props'
import { itSupportsColorsProps } from './style-props/it-supports-colors-props'
import { itSupportsFontsProps } from './style-props/it-supports-fonts-props'
import { itSupportsMarginsProps } from './style-props/it-supports-margins-props'
import { itSupportsPaddingsProps } from './style-props/it-supports-paddings-props'
import { itSupportsPositionProps } from './style-props/it-supports-position-props'
import { itSupportsSizeProps } from './style-props/it-supports-size-props'

interface Options<Props extends Record<string, any>, StylesApiSelectors extends string> {
  component: any
  props: Props
  mod?: boolean
  classes?: boolean
  varsResolver?: boolean
  withProps?: boolean
  styleProps?: boolean
  polymorphic?: boolean
  children?: boolean
  extend?: boolean
  variant?: boolean
  id?: boolean
  size?: boolean
  name?: string
  selector?: string
  refType?: any
  refProp?: string
  providerName?: string | null
  staticName: string
  stylesApiName?: string
  stylesApiSelectors?: StylesApiSelectors[]
  polymorphicSelector?: string
  variantSelector?: string
  sizeSelector?: string
  providerStylesApi?: boolean
  compound?: boolean
  attributes?: boolean
  slots?: Record<string, any>
  wrapper?: any
}

const defaultOptions: Partial<Options<Record<string, any>, string>> = {
  mod: true,
  styleProps: true,
  classes: true,
  withProps: true,
  extend: true,
  variant: true,
  id: true,
  size: true,
  attributes: true,
}

export function itSupportsSystemProps<
  Props extends Record<string, any>,
  StylesApiSelectors extends string = string,
>(_options: Options<Props, StylesApiSelectors>) {
  const options = { ...defaultOptions, ..._options } as Options<Props, StylesApiSelectors>
  describe('supports system properties', () => {
    const predictedProviderName = options.name ?? undefined
    const providerName = options.providerName || predictedProviderName
    const stylesApiName = options.stylesApiName || providerName
    const staticName = options.staticName

    const wrappedComponent = options.wrapper
      ? defineComponent({
          name: options.component.name || 'WrappedComponent',
          inheritAttrs: true,
          props: options.component.props || {},
          setup(props, { slots, attrs, expose }) {
            const componentRef = ref<InstanceType<typeof options.component> | null>(null)
            expose({
              root: computed(() => componentRef.value?.root ?? null),
            })
            return () => {
              const child = h(options.component, { ...props, ...attrs, ref: componentRef }, slots)
              return h(options.wrapper, null, { default: () => child })
            }
          },
        })
      : options.component

    const renderOptions = { ...options, component: wrappedComponent }

    itSupportsClassName(renderOptions)
    itSupportsHiddenVisible(renderOptions)
    itSupportsLightDarkHidden(renderOptions)
    itSupportsStyle(renderOptions)
    itSupportsOthers(renderOptions)

    options.refType !== null &&
      itSupportsRef({ ...renderOptions, refType: options.refType || HTMLElement })
    options.polymorphic &&
      itIsPolymorphic({
        ...renderOptions,
        selector: options.polymorphicSelector || options.selector,
      })
    options.children && itRendersChildren(renderOptions)
    typeof providerName === 'string' &&
      options.providerName !== null &&
      itSupportsProviderDefaultProps({ ...renderOptions, providerName })

    if (options.styleProps) {
      itSupportsMarginsProps(renderOptions)
      itSupportsPaddingsProps(renderOptions)
      itSupportsColorsProps(renderOptions)
      itSupportsFontsProps(renderOptions)
      itSupportsSizeProps(renderOptions)
      itSupportsBackgroundProps(renderOptions)
      itSupportsPositionProps(renderOptions)
    }

    if (options.variant) {
      itSupportsVariant({ ...renderOptions, selector: options.variantSelector || options.selector })
    }

    if (options.size) {
      itSupportsSize({ ...renderOptions, selector: options.sizeSelector || options.selector })
    }

    if (options.mod) {
      itSupportsMod({ ...renderOptions, selector: options.sizeSelector || options.selector })
    }

    if (Array.isArray(options.stylesApiSelectors) && stylesApiName) {
      itSupportsStylesApi<Props, StylesApiSelectors>({
        ...renderOptions,
        selectors: options.stylesApiSelectors,
        providerName: stylesApiName,
        staticName,
      })
    }

    if (options.extend) {
      itHasExtend(options)
    }

    if (options.classes) {
      itHasClasses(options)
    }

    if (options.varsResolver) {
      itHasStaticVarsResolver(options)
    }

    if (options.withProps) {
      itHasWithProps(options)
    }

    if (options.id) {
      itSupportsId(renderOptions)
    }

    if (options.name) {
      it('has correct name', () => {
        expect(options.component.name).toBe(options.name)
      })
    }
  })
}
