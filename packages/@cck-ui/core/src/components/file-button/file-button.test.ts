import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import FileButton, { CFileButton } from '.'

describe('@cck-ui/core/file-button', () => {
  tests.axe([
    {
      component: FileButton,
      options: {
        slots: {
          default: () => h('button', { type: 'button' }, 'Upload files'),
        },
      },
    },
  ])

  tests.itSupportsRef({
    component: CFileButton,
    props: {},
    refProp: 'input',
    refType: HTMLInputElement,
  })

  it('sets given input name', () => {
    const { wrapper } = render(FileButton, {
      props: { name: 'test-name' },
    })
    const input = wrapper.find('input[type="file"]')
    expect(input.attributes('name')).toBe('test-name')
  })

  it('sets given input accept', () => {
    const { wrapper } = render(FileButton, {
      props: { accept: 'image/png,image/jpeg' },
    })
    const input = wrapper.find('input[type="file"]')
    expect(input.attributes('accept')).toBe('image/png,image/jpeg')
  })
})
