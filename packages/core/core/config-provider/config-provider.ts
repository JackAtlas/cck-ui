import { provide } from 'vue'
import { CColorScheme, CThemeOverride } from './theme.types'

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

  withGlobalClasses?: boolean

  /**
   * @description Enviroment at which the useTheme is used, `'test'` environment disables all transitions and portals
   */
  env?: 'default' | 'test'
}

export function ConfigProvider({ theme }: ConfigProviderProps) {
  theme && provide(THEME_KEY, theme)
}
