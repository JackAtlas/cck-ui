import { axe } from './axe'
import { itSupportsSystemProps } from './it-supports-system-props'
import { itSupportsFocusEvent } from './shared/it-supports-focus-events'
import { itSupportsRef } from './shared/it-supports-ref'

export const tests = { itSupportsRef, itSupportsFocusEvent, itSupportsSystemProps, axe }
export { render, renderWithAct } from './render'
export { wait } from './wait'
