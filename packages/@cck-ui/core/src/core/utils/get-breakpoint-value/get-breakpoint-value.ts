import { CBreakpoint } from '../../config-provider'
import { px } from '../units-converters'

export type BreakpointsSource = Record<CBreakpoint, number | string>

export function getBreakpointValue(
  breakpoint: number | string,
  breakpoints: BreakpointsSource
) {
  if (breakpoint in breakpoints) {
    return px(breakpoints[breakpoint as CBreakpoint]) as number
  }
  return px(breakpoint) as number
}
