import type { CColorScheme } from '../theme.types'

export interface CColorSchemeManager {
  /**
   * @description Function to retrieve color scheme value from external storage, for example window.localStorage
   * @returns color scheme value
   */
  get: (defaultValue: CColorScheme) => CColorScheme

  /**
   * @description Function to set color scheme value in external storage, for example window.localStorage
   * @param value color scheme value to be saved
   * @returns
   */
  set: (value: CColorScheme) => void

  /**
   * Function to subscribe to color scheme changes triggered by external events
   * @param onUpdate Function to trigger when color scheme is updated
   * @returns
   */
  subscribe: (onUpdate: (colorScheme: CColorScheme) => void) => void

  /**
   * Function to unsubscribe from color scheme changes triggered by external events
   * @returns
   */
  unsubscribe: () => void

  /**
   * @description Function to clear value from external storage
   * @returns
   */
  clear: () => void
}
