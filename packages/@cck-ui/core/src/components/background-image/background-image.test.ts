import { describe } from 'vitest'
import { BackgroundImageProps, BackgroundImageStylesNames } from './background-image.types'
import { tests } from '@cck-ui-tests/core'
import CBackgroundImage from '.'

const defaultProps: BackgroundImageProps = {
  src: 'test.png',
}

describe('@cck-ui/core/background-image', () => {
  tests.itSupportsSystemProps<BackgroundImageProps, BackgroundImageStylesNames>({
    component: CBackgroundImage,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    children: true,
    name: 'CBackgroundImage',
    staticName: 'BackgroundImage',
    stylesApiSelectors: ['root'],
  })
})
