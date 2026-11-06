<script lang="ts">
import { cloneVNode, defineComponent, isVNode, PropType, VNodeRef } from 'vue'

export default defineComponent({
  name: 'TooltipTarget',
  props: {
    targetRef: {
      type: [Object, Function] as PropType<VNodeRef>,
      required: true,
    },
    referenceProps: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    refProp: {
      type: String,
      default: 'ref',
    },
  },
  setup(props, { slots }) {
    return () => {
      const children = slots.default?.()
      if (!children || children.length === 0) {
        return null
      }

      const child = children[0]
      if (!isVNode(child)) {
        return null
      }

      const merged: Record<string, any> = {
        ...props.referenceProps,
      }

      if (props.refProp === 'ref') {
        merged.ref = props.targetRef
      } else {
        merged[props.refProp] = props.targetRef
      }

      return cloneVNode(child, merged)
    }
  },
})
</script>
