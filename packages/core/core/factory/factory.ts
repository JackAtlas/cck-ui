export interface FactoryPayload {
  props: Record<string, any>
  ctx?: any
  ref?: any
  stylesNames?: string
  vars?: any
  variant?: string
  staticComponents?: Record<string, any>
  compound?: boolean
  signature?: any
}
