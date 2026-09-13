import { describe, expect, it } from 'vitest'
import CCollapse, { CollapseProps } from '.'
import { render } from '@cck-ui-tests/core'
import { h, ref } from 'vue'

describe('@cck-ui/core/collapse', () => {
  it('applies style when transitionDuration is 0', () => {
    const props = {
      expanded: true,
      transitionDuration: 0,
      style: {
        background: 'red',
      },
    } satisfies Partial<CollapseProps>
    const { container } = render(CCollapse, {
      props,
      slots: {
        default: () => h('div', {}, () => 'content'),
      },
    })
    const contentEl = container.querySelector('div') as HTMLElement
    expect(contentEl.style.background).toBe('red')
  })

  it('forwards ref when transitionDuration is 0', () => {
    const rootRef = ref<HTMLElement | null>(null)

    const props = {
      expanded: true,
      transitionDuration: 0,
      ref: rootRef,
    } satisfies Partial<CollapseProps> & { ref: typeof rootRef }
    render(CCollapse, {
      props,
      slots: {
        default: () => h('div', {}, () => 'content'),
      },
    })
    expect(rootRef.value).not.toBeNull()
  })
  it('applies display: none style when keepMountedMode is display-none and expanded is false (transitionDuration is 0)', () => {
    const props = {
      expanded: false,
      transitionDuration: 0,
      keepMounted: true,
      keepMountedMode: 'display-none',
    } satisfies Partial<CollapseProps>
    const { container } = render(CCollapse, {
      props,
      slots: {
        default: () => h('div', {}, () => 'content'),
      },
    })
    const contentEl = container.querySelector('div') as HTMLElement
    expect(contentEl.style.display).toBe('none')
  })
})
