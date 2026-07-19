import { Component } from 'vue'
import Axe from 'axe-core'
import { render } from './render'

const config: Axe.RunOptions = {
  rules: {
    region: { enabled: false },
    'autocomplete-valid': { enabled: false },
  },
}

export function axe(elements: Array<Component | { component: Component; options?: any }>) {
  it('has no accessibility violations', async () => {
    for (const element of elements) {
      let component: Component
      let options: any = {}

      if (typeof element === 'object' && 'component' in element) {
        component = element.component
        options = element.options || {}
      } else {
        component = element as Component
      }

      const { container } = render(component, options)
      const results = await Axe.run(container, config)

      if (results.violations.length > 0) {
        console.error(
          'Accessiblility violations found:\n',
          JSON.stringify(results.violations, null, 2)
        )
      }

      expect(results.violations).toHaveLength(0)
    }
  }, 3000)
}
