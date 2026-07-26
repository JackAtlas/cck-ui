import { Component } from 'vue'

interface Options {
  component: Component
}

export function itHasWithProps(options: Options, name = 'has static withProps function') {
  it(name, () => {
    expect(typeof (options.component as any).withProps).toBe('function')
  })
}
