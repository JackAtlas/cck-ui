import { describe } from 'vitest'
import { AspectRatioProps, AspectRatioStylesNames } from './aspect-ratio.types'
import { tests } from '@cck-ui-tests/core'
import CAspectRatio from '.'

const defaultProps: AspectRatioProps = {}

describe('@cck-ui/core/AspectRatio', () => {
  tests.itSupportsSystemProps<AspectRatioProps, AspectRatioStylesNames>({
    component: CAspectRatio,
    props: defaultProps,
    varsResolver: true,
    children: true,
    name: 'CAspectRatio',
    staticName: 'AspectRatio',
    stylesApiSelectors: ['root'],
  })
})
