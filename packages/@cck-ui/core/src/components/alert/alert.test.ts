import { describe } from 'vitest'
import CAlert from '.'
import { AlertProps, AlertStylesNames } from './alert.types'
import { tests } from '@cck-ui-tests/core'

const defaultProps: AlertProps = {
  withCloseButton: true,
  closeButtonLabel: 'test-close',
}

const defaultSlots = {
  icon: () => 'test-icon',
  title: () => 'test-title',
  default: () => 'test-children',
}

describe('@cck-ui/core/Alert', () => {
  tests.axe([
    {
      component: CAlert,
      options: { slots: { default: defaultSlots.default } },
    },
    {
      component: CAlert,
      options: { slots: { title: defaultSlots.title, default: defaultSlots.default } },
    },
    {
      component: CAlert,
      options: {
        props: defaultProps,
        slots: { default: defaultSlots.default },
      },
    },
  ])

  tests.itSupportsSystemProps<AlertProps, AlertStylesNames>({
    component: CAlert,
    props: defaultProps,
    slots: defaultSlots,
    varsResolver: true,
    children: true,
    name: 'CAlert',
    staticName: 'Alert',
    stylesApiSelectors: [
      'root',
      'body',
      'label',
      'title',
      'icon',
      'wrapper',
      'message',
      'close-button',
    ],
  })
})
