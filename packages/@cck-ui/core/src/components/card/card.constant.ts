import { InjectionKey } from 'vue'
import { CardContextValue } from './card.context'

export const CARD_CONTEXT_KEY: InjectionKey<CardContextValue> = Symbol('CardContext')
