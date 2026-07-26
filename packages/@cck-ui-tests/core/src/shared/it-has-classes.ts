import { Component } from 'vue'

interface Options {
  component: Component
}

export function itHasClasses(options: Options, name = 'has static classes') {
  it(name, () => {
    const { classes } = options.component as any
    expect(typeof classes === 'object' && classes !== null && !Array.isArray(classes)).toBe(true)
  })
}
