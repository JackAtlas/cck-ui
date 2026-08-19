import { describe, it, expect } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import CImage from '.'
import { ImageProps, ImageStylesNames } from './image.types'

const defaultProps: ImageProps = {}

describe('@cck-ui/core/image', () => {
  tests.itSupportsSystemProps<ImageProps, ImageStylesNames>({
    component: CImage,
    props: defaultProps,
    varsResolver: true,
    name: 'CImage',
    staticName: 'Image',
    stylesApiSelectors: ['root'],
  })

  it('sets data-fallback attribute if image cannot be loaded', async () => {
    const { wrapper, rerender } = render(CImage, {
      props: { src: null, fallbackSrc: 'test-fallback.jpg' },
    })

    let img = wrapper.find('img')
    expect(img.attributes('data-fallback')).toBe('true')
    expect(img.attributes('src')).toBe('test-fallback.jpg')

    await rerender({ src: 'test.jpg' as any, fallbackSrc: 'test-fallback.jpg' })
    img = wrapper.find('img')
    expect(img.attributes('data-fallback')).toBeUndefined()
    expect(img.attributes('src')).toBe('test.jpg')
  })
})
