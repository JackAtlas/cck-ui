import { Component } from 'vue'
import { render } from '../render'
import { CTheme } from '@cck-ui/core'

interface Options<Props extends Record<string, any> = any, Selectors extends string = string> {
  component: Component
  props: Props
  selectors: Selectors[]
  providerName: string
  providerStylesApi?: boolean
  staticName: string
  compound?: boolean
  attributes?: boolean
  slots?: Record<string, any>
}

function getTestObjectClassNames(selectors: string[]): Record<string, string> {
  return selectors.reduce<Record<string, string>>((acc, selector) => {
    acc[selector] = `test-${selector}`
    return acc
  }, {})
}

function getTestFunctionClassNames(selectors: string[]) {
  return (theme: CTheme, props: any) => {
    return selectors.reduce<Record<string, string>>((acc, selector) => {
      const rand = props['data-test'] === undefined ? Math.random() : props['data-test']
      acc[selector] = `test-${rand}-${theme.defaultRadius ?? 'md'}-${selector}`
      return acc
    }, {})
  }
}

function randomNumber(min = 10, max = 100) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function itSupportsStylesApi<
  Props extends Record<string, any>,
  Selectors extends string = string,
>(options: Options<Props, Selectors>, name = 'supports styles api') {
  const {
    component,
    props,
    selectors,
    slots = {},
    staticName,
    compound = false,
    attributes = true,
  } = options

  if (!compound && attributes !== false) {
    it(`${name}: attributes`, () => {
      const attributesObj = selectors.reduce<Record<string, Record<string, string>>>(
        (acc, selector) => {
          acc[selector] = { 'data-test-id': selector }
          return acc
        },
        {}
      )

      const { wrapper } = render(component, {
        props: { ...props, attributes: attributesObj },
        slots: options.slots,
      })

      selectors.forEach((selector) => {
        const el = wrapper.find(`[data-test-id="${selector}"]`)
        expect(el.exists()).toBe(true)
      })
    })
  }

  it(`${name}: classNames (inline object)`, () => {
    const classNames = getTestObjectClassNames(selectors)
    const { wrapper } = render(component, {
      props: { ...props, classNames },
      slots: options.slots,
    })

    selectors.forEach((selector) => {
      const el = wrapper.find(`.${classNames[selector]}`)
      expect(el.exists()).toBe(true)
    })
  })

  if (!compound) {
    it(`${name}: classNames (inline function)`, () => {
      const classNamesFn = getTestFunctionClassNames(selectors)
      const { wrapper } = render(component, {
        props: { ...props, 'data-test': '__test', classNames: classNamesFn },
        slots: options.slots,
      })

      const expected = classNamesFn({} as any, { 'data-test': '__test' })
      selectors.forEach((selector) => {
        const el = wrapper.find(`.${expected[selector]}`)
        expect(el.exists()).toBe(true)
      })
    })
  }

  it(`${name}: styles (inline object)`, () => {
    const classNames = getTestObjectClassNames(selectors)
    const styles = selectors.reduce<Record<string, Record<string, string>>>((acc, selector) => {
      acc[selector] = { fontSize: `${randomNumber()}px` }
      return acc
    }, {})

    const { wrapper } = render(component, {
      props: { ...props, classNames, styles },
      slots: options.slots,
    })

    selectors.forEach((selector) => {
      const el = wrapper.find(`.${classNames[selector]}`)
      expect(el.exists()).toBe(true)
      const elStyle = el.element as HTMLElement
      expect(elStyle.style.fontSize).toBe(styles[selector].fontSize)
    })
  })

  if (!compound) {
    it(`${name}: styles (inline function)`, () => {
      const classNames = getTestObjectClassNames(selectors)
      const stylesFn = (theme: CTheme, props: any) =>
        selectors.reduce<Record<string, Record<string, string>>>((acc, selector) => {
          acc[selector] = {
            outlineColor: props['data-test'],
            boxShadow: theme?.shadows?.xl || '0 0 0 0',
          }
          return acc
        }, {})

      const { wrapper } = render(component, {
        props: {
          ...props,
          'data-test': 'rgb(250, 128, 114)',
          classNames,
          styles: stylesFn,
        },
        slots: options.slots,
      })

      const expected = stylesFn({} as CTheme, { 'data-test': 'rgb(250, 128, 114)' })
      selectors.forEach((selector) => {
        const el = wrapper.find(`.${classNames[selector]}`)
        expect(el.exists()).toBe(true)
        const elStyle = el.element as HTMLElement
        expect(elStyle.style.outlineColor).toBe(expected[selector].outlineColor)
      })
    })
  }

  it(`${name}: static classNames (default)`, () => {
    const { wrapper } = render(component, { props, slots: options.slots })
    selectors.forEach((selector) => {
      const el = wrapper.find(`.c-${options.staticName}-${selector}`)
      expect(el.exists()).toBe(true)
    })
  })

  if (options.providerStylesApi !== false) {
    it(`${name}: classNames (Provider object)`, () => {
      const classNames = getTestObjectClassNames(selectors)
      const { wrapper } = render(component, {
        props,
        themeOverride: {
          components: {
            [staticName]: {
              classNames,
            },
          },
        },
        slots,
      })

      selectors.forEach((selector) => {
        const el = wrapper.find(`.${classNames[selector]}`)
        expect(el.exists()).toBe(true)
      })
    })

    it(`${name}: classNames (Provider function)`, () => {
      const classNamesFn = getTestFunctionClassNames(selectors)
      const { wrapper } = render(component, {
        props: { ...props, 'data-test': '__test' },
        themeOverride: {
          components: {
            [staticName]: {
              classNames: classNamesFn,
            },
          },
        },
        slots,
      })

      const expected = classNamesFn({} as CTheme, { 'data-test': '__test' })
      selectors.forEach((selector) => {
        const el = wrapper.find(`.${expected[selector]}`)
        expect(el.exists()).toBe(true)
      })
    })
  }

  it(`${name}: styles (Provider object)`, () => {
    const classNames = getTestObjectClassNames(selectors)
    const styles = selectors.reduce<Record<string, Record<string, string>>>((acc, selector) => {
      acc[selector] = { fontSize: `${randomNumber()}px` }
      return acc
    }, {})

    const { wrapper } = render(component, {
      props,
      themeOverride: {
        components: {
          [staticName]: {
            styles,
            classNames,
          },
        },
      },
      slots,
    })

    selectors.forEach((selector) => {
      const el = wrapper.find(`.${classNames[selector]}`)
      expect(el.exists()).toBe(true)
      const elStyle = el.element as HTMLElement
      expect(elStyle.style.fontSize).toBe(styles[selector].fontSize)
    })
  })

  it(`${name}: styles (Provider function)`, () => {
    const classNames = getTestObjectClassNames(selectors)
    const stylesFn = (theme: CTheme, props: any) =>
      selectors.reduce<Record<string, Record<string, string>>>((acc, selector) => {
        acc[selector] = {
          outlineColor: props['data-test'],
          boxShadow: theme?.shadows?.xl || '0 0 0 0',
        }
        return acc
      }, {})

    const { wrapper } = render(component, {
      props: { ...props, 'data-test': 'rgb(250, 128, 114)' },
      themeOverride: {
        components: {
          [staticName]: {
            styles: stylesFn,
            classNames,
          },
        },
      },
      slots,
    })

    const expected = stylesFn({} as CTheme, { 'data-test': 'rgb(250, 128, 114)' })
    selectors.forEach((selector) => {
      const el = wrapper.find(`.${classNames[selector]}`)
      expect(el.exists()).toBe(true)
      const elStyle = el.element as HTMLElement
      expect(elStyle.style.outlineColor).toBe(expected[selector].outlineColor)
    })
  })

  it(`${name}: static classNames (Provider prefix)`, () => {
    const { wrapper } = render(component, {
      props,
      providerProps: { classNamesPrefix: 'test' },
      slots,
    })

    selectors.forEach((selector) => {
      const el = wrapper.find(`.test-${staticName}-${selector}`)
      expect(el.exists()).toBe(true)
    })
  })
}
