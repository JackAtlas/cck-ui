import { Component } from 'vue'

interface Options {
  component: Component
}

export function itHasExtend(options: Options, name = 'has static extend function') {
  it(name, () => {
    expect(typeof (options.component as any).extend).toBe('function')
  })
}
