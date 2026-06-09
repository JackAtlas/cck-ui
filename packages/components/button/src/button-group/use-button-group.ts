import {
  Comment,
  Fragment,
  Slots,
  Text,
  VNode,
  computed,
  isVNode,
  ref
} from 'vue'
import CButton from '../button.vue'
import CButtonGroupSection from '../button-group-section/button-group-section.vue'
import { getComponentName } from '@cck-ui/utils'
import { ButtonGroupProps } from './button-group.types.js'

export const getValidButtons = (children: VNode[]): VNode[] => {
  const result: VNode[] = []

  for (const child of children) {
    if (!isVNode(child)) continue

    if (child.type === Comment || child.type === Text) continue

    if (child.type === Fragment) {
      const fragmentChildren = Array.isArray(child.children)
        ? child.children
        : [child.children]
      result.push(...getValidButtons(fragmentChildren as VNode[]))
      continue
    }

    if (child.type !== CButton && child.type !== CButtonGroupSection) {
      console.error(
        '[CButtonGroup] invalid child component: only CButton or CButtonGroupSection components are allowed as direct children.',
        `Received: <${getComponentName(child.type)}>.`,
        'Please ensure all direct children are <c-button> or <c-button-group-section> components.'
      )
      continue
    }

    result.push(child)
  }

  return result
}

export const useButtonGroup = (props: ButtonGroupProps, slots: Slots) => {
  const _ref = ref<HTMLDivElement>()

  const validChildren = computed(() => {
    const defaultSlot = slots.default?.() ?? []
    return getValidButtons(defaultSlot)
  })

  const _props = computed(() => {
    const _attrs: Record<string, any> = {
      'data-orientation': props.orientation
    }

    return _attrs
  })

  return { _ref, _props, validChildren }
}
