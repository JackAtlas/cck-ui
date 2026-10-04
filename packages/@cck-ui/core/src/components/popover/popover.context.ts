import { inject, InjectionKey, provide, Ref } from 'vue'
import { TransitionOverride } from '../transition'
import { PopoverFactory, PopoverWidth } from './popover.types'
import { ArrowPosition, FloatingPosition, FloatingStrategy } from '../../utils/Floating'
import { PortalProps } from '../portal'
import { ClassNames, CRadius, CShadow, CStyleProp, GetStylesApi, Styles } from '../../core'

export interface PopoverContextValue {
  x: Ref<number>
  y: Ref<number>
  arrowX: Ref<number | undefined>
  arrowY: Ref<number | undefined>
  arrowRef: Ref<HTMLDivElement | null>
  opened: Ref<boolean>
  transitionProps?: TransitionOverride
  reference: (node: HTMLElement) => void
  floating: (node: HTMLElement) => void
  width?: Ref<PopoverWidth>
  withArrow?: Ref<boolean | undefined>
  arrowSize: Ref<number>
  arrowOffset: Ref<number>
  arrowRadius: Ref<number>
  arrowPosition: Ref<ArrowPosition>
  trapFocus: Ref<boolean | undefined>
  placement: Ref<FloatingPosition>
  withinPortal: Ref<boolean | undefined>
  portalProps?: PortalProps
  closeOnEscape?: Ref<boolean | undefined>
  zIndex: Ref<string | number | undefined>
  radius?: Ref<CRadius | undefined>
  shadow?: Ref<CShadow | undefined>
  onClose?: () => void
  onDismiss?: () => void
  getDropdownId: () => string
  getTargetId: () => string
  controlled: Ref<boolean>
  onToggle: () => void
  withRoles: Ref<boolean | undefined>
  targetProps: Record<string, any>
  disabled: Ref<boolean | undefined>
  returnFocus: Ref<boolean | undefined>
  classNames: Ref<ClassNames<PopoverFactory> | undefined>
  styles: Styles<PopoverFactory> | undefined
  unstyled: Ref<boolean | undefined>
  __staticSelector: Ref<string>
  variant: Ref<string | undefined>
  keepMounted: Ref<boolean | undefined>
  keepMountedMode: Ref<'activity' | 'display-none' | undefined>
  floatingStrategy: Ref<FloatingStrategy | undefined>
  referenceHidden: Ref<boolean>
  resolvedStyles?: { dropdown?: CStyleProp }
  getStyles: GetStylesApi<PopoverFactory>
}

export const POPOVER_KEY: InjectionKey<PopoverContextValue> = Symbol('PopoverContext')

export function providePopoverContext(value: PopoverContextValue) {
  provide(POPOVER_KEY, value)
}

export function usePopoverContext() {
  const ctx = inject(POPOVER_KEY)
  if (!ctx) {
    throw new Error('[@cck-ui/Popover] Popover component was not found in the tree')
  }
  return ctx
}
