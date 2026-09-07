import { tests } from '@cck-ui-tests/core'
import { describe } from 'vitest'
import { OverflowListProps, OverflowListStylesNames } from './overflow-list.types'
import COverflowList from '.'

const defaultProps: OverflowListProps<any> = {
  data: ['1', '2', '3', '4', '5', '6,', '7', '8', '9', '10'],
}

describe('@cck-ui/core/overflow-list', () => {
  tests.itSupportsSystemProps<OverflowListProps<any>, OverflowListStylesNames>({
    component: COverflowList,
    props: defaultProps,
    varsResolver: true,
    name: 'COverflowList',
    staticName: 'OverflowList',
    stylesApiSelectors: ['root'],
  })
})
