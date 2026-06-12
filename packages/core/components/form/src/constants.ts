import { InjectionKey } from 'vue'
import { FormContext } from './form.types'

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')
