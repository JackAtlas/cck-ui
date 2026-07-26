import { Component } from 'vue'

interface Options {
  component: Component
}

export function itHasStaticVarsResolver(options: Options, name = 'has static vars resolver') {
  it(name, () => {
    const { varsResolver } = options.component as any
    expect(typeof varsResolver === 'function').toBe(true)
  })
}
