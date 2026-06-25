import { FactoryPayload } from './factory'

export interface PolymorphicFactoryPayload extends FactoryPayload {
  defaultComponent: any
  defaultRef: any
}
