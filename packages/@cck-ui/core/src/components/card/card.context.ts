import { GetStylesApi } from '../../core'
import { CardFactory } from './card.types'

export interface CardContextValue {
  getStyles: GetStylesApi<CardFactory>
}
