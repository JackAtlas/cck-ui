export { deepMerge } from './deep-merge/deep-merge'
export { camelToKebabCase } from './camel-to-kebab-case/camel-to-kebab-case'
export { filterProps } from './filter-props/filter-props'
export { getBaseValue } from './get-base-value/get-base-value'
export { getBreakpointValue } from './get-breakpoint-value/get-breakpoint-value'
export { getDefaultZIndex } from './get-default-z-index/get-default-z-index'
export {
  getSize,
  getSpacing,
  getShadow,
  getRadius,
  getFontSize,
  getLineHeight,
} from './get-size/get-size'
export { getSortedBreakpoints } from './get-sorted-breakpoints/get-sorted-breakpoints'
export { isNumberLike } from './is-number-like/is-number-like'
export { numberLikeStringToNumber } from './number-like-string-to-number/number-like-string-to-number'
export { keys } from './keys/keys'
export { px, rem, em } from './units-converters'
export {
  getComponentName,
  withClasses,
  withExtend,
  withInstall,
  withPropsDefaultSetter,
  withPropsFactory,
  withVarsResolver,
} from './vue'
export type {
  SFCInstallWithContext,
  SFCWithInstall,
  SFCWithInstallAndClasses,
  SFCWithPropsDefaultSetter,
} from './vue'
export { isNumber, isString, isStringNumber, isUndefined } from './types'
