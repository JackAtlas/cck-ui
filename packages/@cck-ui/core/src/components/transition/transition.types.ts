import { CTransition } from './transitions'

export interface TransitionProps {
  /**
   * @description If set, the element is kept in the DOM when hidden.
   */
  keepMounted?: boolean

  /**
   * @description Controls how the element is hidden when `keepMounted` is set:
   * `'activity'`
   * `'display-none'` - hidden with `display: none` styles
   * @default 'activity'
   */
  keepMountedMode?: 'activity' | 'display-none'

  /**
   * @description Transition name or object
   */
  transition?: CTransition

  /**
   * @description Transition duration in ms
   * @default 250
   */
  duration?: number

  /**
   * @description Exit transition duration in ms
   * @default 250
   */
  exitDuration?: number

  /**
   * @description Transition timing function
   * @default theme.transitionTimingFunction
   */
  timingFunction?: string

  /**
   * @description Determines whether component should be mounted to the DOM
   */
  mounted: boolean

  /**
   * @description Called when exit transition ends
   * @returns
   */
  onExited?: () => void

  /**
   * @description Called when exit transition starts
   * @returns
   */
  onExit?: () => void

  /**
   * @description Called when enter transition starts
   * @returns
   */
  onEnter?: () => void

  /**
   * @description Called when enter transition ends
   * @returns
   */
  onEntered?: () => void

  /**
   * @description Delay in ms before enter transition starts
   */
  enterDelay?: number

  /**
   * @description Delay in ms before exit transition starts
   */
  exitDelay?: number
}

export type TransitionOverride = Partial<Omit<TransitionProps, 'mounted'>>
