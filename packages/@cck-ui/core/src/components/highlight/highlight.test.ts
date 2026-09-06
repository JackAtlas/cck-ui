import { describe, expect, it } from 'vitest'
import { HighlightProps } from './highlight.types'
import { render, tests } from '@cck-ui-tests/core'
import { TextStylesNames } from '../text'
import CHighlight from '.'

const defaultProps: HighlightProps = {
  highlight: 't',
}

const defaultSlots = {
  default: () => 'test',
}

describe('@cck-ui/core/highlight', () => {
  tests.itSupportsSystemProps<HighlightProps, TextStylesNames>({
    component: CHighlight,
    props: defaultProps,
    slots: defaultSlots,
    polymorphic: true,
    name: 'CHighlight',
    staticName: 'Highlight',
    stylesApiSelectors: ['root'],
  })

  it('highlights correct value', () => {
    const { wrapper } = render(CHighlight, {
      props: { caseInsensitive: true, highlight: 'he' },
      slots: { default: () => 'Hello' },
    })

    const mark = wrapper.find('mark')
    expect(mark.exists()).toBeTruthy()
    expect(mark.text()).contains('He')
  })
})
