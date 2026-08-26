import { defineComponent, h } from 'vue'
import { LoaderProps, LoaderStylesNames } from './loader.types'
import { describe, expect, it } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import CLoader, { CDefaultLoaders } from '.'

const CustomLoader = defineComponent({
  name: 'CustomLoader',
  render() {
    return h('div', { 'data-custom-loader': true })
  },
})

const defaultProps: LoaderProps = {}

describe('@cck-ui/core/loader', () => {
  tests.itSupportsSystemProps<LoaderProps, LoaderStylesNames>({
    component: CLoader,
    props: defaultProps,
    varsResolver: true,
    children: true,
    name: 'CLoader',
    staticName: 'Loader',
    stylesApiSelectors: ['root'],
  })

  it('supports custom loaders', () => {
    const { wrapper } = render(CLoader, {
      props: {
        type: 'custom',
        loaders: {
          ...CDefaultLoaders,
          custom: CustomLoader,
        },
      },
    })

    expect(wrapper.find('[data-custom-loader]').exists()).toBe(true)
  })

  it('supports custom loaders on CckConfigProvider', () => {
    const { wrapper } = render(CLoader, {
      themeOverride: {
        components: {
          CLoader: {
            defaultProps: {
              type: 'custom',
              loaders: { ...CDefaultLoaders, custom: CustomLoader },
            },
          },
        },
      },
    })

    expect(wrapper.find('[data-custom-loader]').exists()).toBe(true)
  })

  it('sets data-size attribute', async () => {
    const { wrapper, rerender } = render(CLoader, {
      props: { size: 'xl' },
    })

    expect(wrapper.find('[data-size="xl"]').exists()).toBe(true)

    await rerender({ props: { size: '100' } })
    expect(wrapper.find('[data-size]').exists()).toBe(false)
  })

  // it('expose defaultLoaders as static property', () => {
  //   expect(CLoader.defaultLoaders).toStrictEqual(CDefaultLoaders)
  // })
})
