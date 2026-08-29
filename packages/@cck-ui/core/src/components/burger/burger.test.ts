import { describe, expect, it } from 'vitest'
import { BurgerProps, BurgerStylesNames } from './burger.types'
import { render, tests } from '@cck-ui-tests/core'
import CBurger from '.'
import { h } from 'vue'
import CVisuallyHidden from '../visually-hidden'

const defaultProps: BurgerProps = {}

describe('@cck-ui/core/burger', () => {
  tests.axe([
    {
      component: CBurger,
      options: {
        props: { 'aria-label': 'test', key: '1' },
      },
    },
    {
      component: CBurger,
      options: {
        props: { key: '2' },
        slots: {
          default: () => h(CVisuallyHidden, {}, 'test'),
        },
      },
    },
  ])

  tests.itSupportsSystemProps<BurgerProps, BurgerStylesNames>({
    component: CBurger,
    props: defaultProps,
    varsResolver: true,
    name: 'CBurger',
    staticName: 'Burger',
    stylesApiSelectors: ['root', 'burger'],
  })

  it('sets data-opened attribute based on opened prop', async () => {
    const { wrapper, rerender } = render(CBurger, {
      props: { opened: true },
    })

    const burger = wrapper.find('.c-Burger-burger')
    expect(burger.attributes('data-opened')).toBe('true')

    await rerender({ props: { opened: false } })
    expect(burger.attributes('data-opened')).toBeUndefined()
  })
})
