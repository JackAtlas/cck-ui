import { describe } from 'vitest'
import { AvatarGroupProps, AvatarGroupStylesNames } from './avatar-group.types'
import { tests } from '@cck-ui-tests/core'
import { CAvatarGroup } from '..'

const defaultProps: AvatarGroupProps = {}

describe('@cck-ui/core/avatar-group', () => {
  tests.itSupportsSystemProps<AvatarGroupProps, AvatarGroupStylesNames>({
    component: CAvatarGroup,
    props: defaultProps,
    varsResolver: true,
    children: true,
    name: 'CAvatarGroup',
    staticName: 'AvatarGroup',
    stylesApiSelectors: ['group'],
    refProp: 'group',
  })
})
