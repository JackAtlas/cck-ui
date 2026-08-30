import { describe, expect, it } from 'vitest'
import { getInitialsColor } from './get-initials-color'

describe('@cck-ui/core/avatar/get-initials-color', () => {
  it('should return color based on initials', () => {
    expect(getInitialsColor('John Mol')).toBe('yellow')
    expect(getInitialsColor('John')).toBe('green')
    expect(getInitialsColor('John Doe')).toBe('green')
    expect(getInitialsColor('John Doe', ['red', 'blue'])).toBe('blue')
  })
})
