import { Ref } from 'vue'

export interface FocusTrapPrpos {
  /**
   * If set to `false`, disables focus trap
   */
  active?: boolean

  /** Ref to combine with the focus trap ref */
  innerRef?: Ref<HTMLElement | null> | ((el: HTMLElement | null) => void)
}
