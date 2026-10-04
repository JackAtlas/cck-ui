import { Meta, StoryObj } from '@storybook/vue3-vite'
import CPopover, { CPopoverDropdown, CPopoverTarget } from '.'
import { CckConfigProvider, createTheme } from '../../core'
import { ref } from 'vue'
import CGroup from '../group'

const meta = {
  title: 'Popover',
  component: CPopover,
} satisfies Meta<typeof CPopover>

export default meta

type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  render: () => ({
    components: { CckConfigProvider, CPopover, CPopoverDropdown, CPopoverTarget },
    setup() {
      const theme = createTheme({
        components: {
          PopoverDropdown: CPopoverDropdown.extend({
            defaultProps: {
              'data-test': 'red',
            },
          }),
        },
      })

      return { theme }
    },
    template: `
      <cck-config-provider :theme="theme">
        <div style="padding: 40px;">
          <c-popover>
            <c-popover-target>
              <button type="button">Toggle popover</button>
            </c-popover-target>
            <c-popover-dropdown>Dropdown</c-popover-dropdown>
          </c-popover>
        </div>
      </cck-config-provider>
    `,
  }),
}

export const Scrollable: Story = {
  render: () => ({
    components: { CPopover, CPopoverDropdown, CPopoverTarget },
    setup() {
      const content = Array.from({ length: 10 })

      return { content }
    },
    template: `
      <div style="padding: 40px;">
        <p v-for="(_, index) in content" :key="'p1-' + index">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, facilis rerum molestias voluptatem, quidem sunt, omnis iste ipsa corporis itaque optio. Amet fugiat explicabo, molestias exercitationem consequatur quis dicta unde?</p>
        <p v-for="(_, index) in content" :key="'p2-' + index">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, facilis rerum molestias voluptatem, quidem sunt, omnis iste ipsa corporis itaque optio. Amet fugiat explicabo, molestias exercitationem consequatur quis dicta unde?</p>
        <p v-for="(_, index) in content" :key="'p3-' + index">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, facilis rerum molestias voluptatem, quidem sunt, omnis iste ipsa corporis itaque optio. Amet fugiat explicabo, molestias exercitationem consequatur quis dicta unde?</p>
        <c-popover>
          <c-popover-target>
            <button type="button">Toggle popover</button>
          </c-popover-target>
          <c-popover-dropdown>Dropdown</c-popover-dropdown>
        </c-popover>
        <p v-for="(_, index) in content" :key="'p4-' + index">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, facilis rerum molestias voluptatem, quidem sunt, omnis iste ipsa corporis itaque optio. Amet fugiat explicabo, molestias exercitationem consequatur quis dicta unde?</p>
        <p v-for="(_, index) in content" :key="'p5-' + index">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, facilis rerum molestias voluptatem, quidem sunt, omnis iste ipsa corporis itaque optio. Amet fugiat explicabo, molestias exercitationem consequatur quis dicta unde?</p>
        <p v-for="(_, index) in content" :key="'p6-' + index">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, facilis rerum molestias voluptatem, quidem sunt, omnis iste ipsa corporis itaque optio. Amet fugiat explicabo, molestias exercitationem consequatur quis dicta unde?</p>
      </div>
    `,
  }),
}

export const AtTheEdge: Story = {
  render: () => ({
    components: { CPopover, CPopoverDropdown, CPopoverTarget },
    template: `
      <div style="display: flex; justify-content: flex-end;">
        <c-popover>
          <c-popover-target>
            <button type="button">Toggle popover</button>
          </c-popover-target>
          <c-popover-dropdown>Dropdown</c-popover-dropdown>
        </c-popover>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CPopover, CPopoverDropdown, CPopoverTarget },
    template: `
      <div style="padding: 40px;">
        <c-popover disabled>
          <c-popover-target>
            <button type="button">Toggle popover</button>
          </c-popover-target>
          <c-popover-dropdown>Dropdown</c-popover-dropdown>
        </c-popover>
      </div>
    `,
  }),
}

export const WithArrow: Story = {
  render: () => ({
    components: { CPopover, CPopoverDropdown, CPopoverTarget },
    template: `
      <div style="padding: 40px;">
        <c-popover with-arrow width="400">
          <c-popover-target>
            <button type="button">Toggle popover</button>
          </c-popover-target>
          <c-popover-dropdown>Dropdown</c-popover-dropdown>
        </c-popover>
      </div>
    `,
  }),
}

export const WithArrowRadius: Story = {
  render: () => ({
    components: { CPopover, CPopoverDropdown, CPopoverTarget },
    template: `
      <div style="padding: 40px;">
        <c-popover with-arrow width="400" :arrow-radius="4">
          <c-popover-target>
            <button type="button">Toggle popover</button>
          </c-popover-target>
          <c-popover-dropdown>Dropdown</c-popover-dropdown>
        </c-popover>
      </div>
    `,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { CPopover, CPopoverDropdown, CPopoverTarget },
    setup() {
      const opened = ref(false)
      const toggle = () => (opened.value = !opened.value)
      const close = () => (opened.value = false)

      const onClose = () => console.log('closed')
      const onOpen = () => console.log('opened')

      return { close, opened, toggle, onClose, onOpen }
    },
    template: `
      <div style="padding: 100px;display:flex;align-items:center;jusity-content:center;">
        <c-popover
          position="bottom"
          return-focus
          trap-focus
          with-arrow
          v-model:opened="opened"
          :middlewares="{ shift: false, flip: false }"
          @close="onClose"
          @open="onOpen"
        >
          <c-popover-target>
            <button type="button" @click="toggle">Toggle popover</button>
          </c-popover-target>
          <c-popover-dropdown>
            <button type="button" @click="close">Close</button>
          </c-popover-dropdown>
        </c-popover>
      </div>
    `,
  }),
}

export const KeepMounted: Story = {
  render: () => ({
    components: { CPopover, CPopoverDropdown, CPopoverTarget },
    setup() {
      const opened = ref(false)
      const toggle = () => (opened.value = !opened.value)
      const close = () => (opened.value = false)

      return { close, opened, toggle }
    },
    template: `
      <div style="padding: 100px;display:flex;align-items:center;jusity-content:center;">
        <c-popover keep-mounted v-model:opened="opened">
          <c-popover-target>
            <button type="button" @click="toggle">Toggle popover</button>
          </c-popover-target>
          <c-popover-dropdown>
            <button type="button" @click="close">Close</button>
          </c-popover-dropdown>
        </c-popover>
      </div>
    `,
  }),
}

export const SameWidth: Story = {
  render: () => ({
    components: { CPopover, CPopoverDropdown, CPopoverTarget },
    setup() {
      const opened = ref(false)
      const toggle = () => (opened.value = !opened.value)
      const close = () => (opened.value = false)

      return { close, opened, toggle }
    },
    template: `
      <div style="padding: 40px">
        <c-popover width="target" v-model:opened="opened">
          <c-popover-target>
            <button type="button" @click="toggle">Toggle popover</button>
          </c-popover-target>
          <c-popover-dropdown>Dropdown</c-popover-dropdown>
        </c-popover>
      </div>
    `,
  }),
}

export const WithinGroup: Story = {
  render: () => ({
    components: { CGroup, CPopover, CPopoverDropdown, CPopoverTarget },
    setup() {
      const opened = ref(false)
      const toggle = () => (opened.value = !opened.value)

      return { opened, toggle }
    },
    template: `
      <c-group grow>
        <c-popover v-model:opened="opened">
          <c-popover-target>
            <button type="button" @click="toggle">Toggle popover</button>
          </c-popover-target>
          <c-popover-dropdown>Dropdown</c-popover-dropdown>
        </c-popover>
        <button type="button">Regular button</button>
      </c-group>
    `,
  }),
}

export const AxisOffset: Story = {
  render: () => ({
    components: { CPopover, CPopoverDropdown, CPopoverTarget },
    setup() {
      const opened = ref(false)
      const toggle = () => (opened.value = !opened.value)

      return { opened, toggle }
    },
    template: `
      <div style="padding: 100px;display:flex;align-items:center;jusity-content:center;">
        <c-popover v-model:opened="opened" :offset="{ mainAxis: 50, crossAxis: 50 }">
          <c-popover-target>
            <button type="button" @click="toggle">Toggle popover</button>
          </c-popover-target>
          <c-popover-dropdown>Dropdown</c-popover-dropdown>
        </c-popover>
      </div>
    `,
  }),
}

export const withOverlay: Story = {
  render: () => ({
    components: { CPopover, CPopoverDropdown, CPopoverTarget },
    setup() {
      const opened = ref(false)
      const toggle = () => (opened.value = !opened.value)

      return { opened, toggle }
    },
    template: `
      <div style="padding: 100px;display:flex;align-items:center;jusity-content:center;">
        <c-popover with-overlay v-model:opened="opened" :overlay-props="{ blur: '8px', zIndex: 100 }">
          <c-popover-target>
            <button type="button" style="position:relative;z-index:101;" @click="toggle">Toggle popover</button>
          </c-popover-target>
          <c-popover-dropdown>Dropdown</c-popover-dropdown>
        </c-popover>
      </div>
    `,
  }),
}

export const ReferenceHidden: Story = {
  render: () => ({
    components: { CPopover, CPopoverDropdown, CPopoverTarget },
    setup() {
      const opened = ref(true)
      const toggle = () => (opened.value = !opened.value)

      return { opened, toggle }
    },
    template: `
      <div style="overflow:auto;width:400px;height:200px;margin:100px;border:1px solid;" @click="toggle">
        <div style="padding:40px;width:1000px;height:1000px;">
          <c-popover opened position="top" with-arrow v-model:opened="opened" :hide-detached="false">
            <c-popover-target>
              <button type="button" :style="{ display: opened ? 'block' : 'none' }">Toggle popover</button>
            </c-popover-target>
            <c-popover-dropdown>Dropdown</c-popover-dropdown>
          </c-popover>
        </div>
      </div>
    `,
  }),
}
