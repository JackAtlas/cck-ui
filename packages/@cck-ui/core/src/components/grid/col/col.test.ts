import { defineComponent, h } from 'vue'
import { describe } from 'vitest'
import { tests } from '@cck-ui-tests/core'
import CGrid, { CCol } from '..'
import { ColProps, GridColStylesNames } from './col.types'
import { DEFAULT_COLUMNS } from '../grid.constants'

const defaultProps: ColProps = {
  span: DEFAULT_COLUMNS,
}

describe('@cck-ui/core/grid-col', () => {
  tests.itSupportsSystemProps<ColProps, GridColStylesNames>({
    component: CCol,
    props: defaultProps,
    children: true,
    name: 'CCol',
    staticName: 'Grid',
    stylesApiSelectors: ['col'],
    stylesApiName: 'Grid',
    selector: '.c-Grid-col',
    compound: true,
    providerStylesApi: false,
    wrapper: defineComponent({
      setup(_, { slots }) {
        return () => h(CGrid, { type: 'media' }, { default: () => slots.default?.() })
      },
    }),
  })
})
