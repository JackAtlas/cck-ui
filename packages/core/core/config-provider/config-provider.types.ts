import { CStylesTransform } from './config-provider.context'
import { CColorScheme, CThemeOverride } from './theme.types'

export const CONFIG_KEY = Symbol('CCK_CONFIG_KEY')

export const THEME_KEY = Symbol('THEME_SLATE')

export interface ConfigProviderProps {
  /**
   * @description Theme override object
   */
  theme?: CThemeOverride

  /**
   * @description Default color scheme value used when `colorSchemeManager` cannot retrieve value from external storage
   */
  defaultColorScheme?: CColorScheme

  /**
   * @description Forces color scheme value, if set, useTheme ignores `colorSchemeManager` and `defaultColorScheme`
   */
  forceColorScheme?: 'light' | 'dark'

  /**
   * @description CSS selector to which CSS variales should be added
   */
  cssVariablesSelector?: string

  /**
   * @description Determines whether theme CSS variables should be added to given `cssVariablesSelector`
   */
  withCssVariables?: boolean

  /**
   * @description Function to resolve root element to set `data-c-color-scheme` attribute
   * @returns root element, must return undefined on server
   */
  getRootElement?: () => HTMLElement | undefined

  /**
   * @description A prefix for components static classes (for example `${prefix}-text__root`)
   */
  classNamesPrefix?: string

  /**
   * @description Determines whether components should have static classes, for example `c-button__root`
   */
  withStaticClasses?: boolean

  /**
   * @description Determines whether global classes should be added with `<style />` tag. Global classes are required for `hiddenFrom`/`visibleFrom` and `lightHidden`/`darkHidden` props to work.
   * @default true
   */
  withGlobalClasses?: boolean

  /**
   * An object to transform `styles` and `sx` props into css classes, can be used with CSS-in-JS libraries
   */
  stylesTransform?: CStylesTransform

  /**
   * @description Enviroment at which the useTheme is used, `'test'` environment disables all transitions and portals
   */
  env?: 'default' | 'test'
}
