export type Direction = 'ltr' | 'rtl'

export interface DirectionProviderProps {
  /**
   * Direction set as a default value
   * @default 'ltr'
   */
  initialDirection?: Direction

  /**
   * Determines whether direction should be updated on mount based on `dir` attribute set on root element (usually html element)
   * @default true
   */
  detectDirection?: boolean
}
