import { describe } from 'vitest'
import { KbdProps, KbdStylesNames } from './kbd.types'
import { tests } from '@cck-ui-tests/core'
import CKbd from '.'

const defaultProps: KbdProps = {}

describe('@cck-ui/core/kbd', () => {
  tests.itSupportsSystemProps<KbdProps, KbdStylesNames>({
    component: CKbd,
    props: defaultProps,
    varsResolver: true,
    children: true,
    name: 'CKbd',
    staticName: 'Kbd',
    stylesApiSelectors: ['root'],
  })
})
