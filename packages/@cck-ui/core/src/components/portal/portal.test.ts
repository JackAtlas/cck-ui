import { afterEach, describe, expect, it } from 'vitest'
import { renderWithAct, tests } from '@cck-ui-tests/core'
import CPortal from '.'

describe('@cck-ui/core/portal', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  tests.itHasExtend({ component: CPortal })

  tests.itSupportsRef({
    component: CPortal,
    refType: HTMLDivElement,
    props: {
      reuseTargetNode: true,
    },
  })

  it('renders content inside portal', async () => {
    await renderWithAct(CPortal, {
      props: { reuseTargetNode: true },
      slots: { default: () => 'test-portal' },
    })
    const portal = document.querySelector('[data-portal]')!
    expect(portal.textContent).toBe('test-portal')
  })

  it('supports rendering multiple portal without target', async () => {
    await renderWithAct(CPortal, {
      slots: { default: () => 'test-portal-1' },
    })
    await renderWithAct(CPortal, {
      slots: { default: () => 'test-portal-2' },
    })
    await renderWithAct(CPortal, {
      slots: { default: () => 'test-portal-3' },
    })
    expect(document.querySelectorAll('[data-portal]:not([data-cck-shared-portal])')).toHaveLength(3)
  })

  it('syncs its className to the generated Portal node', async () => {
    await renderWithAct(CPortal, {
      props: { reuseTargetNode: false, className: 'test-portal' },
      slots: { default: () => 'test-portal' },
    })
    const portal = document.querySelector('[data-portal]:not([data-cck-shared-portal])')!
    expect(portal.classList).toContain('test-portal')
  })

  it('does not crash when className is empty or contains extra spaces', async () => {
    await renderWithAct(CPortal, {
      props: { reuseTargetNode: false },
      slots: { default: () => 'empty-className' },
    })
    await renderWithAct(CPortal, {
      props: { reuseTargetNode: false, className: 'hello  world' },
      slots: { default: () => 'className-with-spaces' },
    })
    expect(document.querySelectorAll('[data-portal]:not([data-cck-shared-portal])')).toHaveLength(2)
  })
})
