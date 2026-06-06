import { isString } from '@vue/shared'

export { isString } from '@vue/shared'

export const isUndefined = (val: any): val is undefined => val === undefined
export const isNumber = (val: any): val is number => typeof val === 'number'

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}
