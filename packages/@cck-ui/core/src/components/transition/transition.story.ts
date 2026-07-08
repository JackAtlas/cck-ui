import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { CTransition } from '.'
import { ref } from 'vue'

const meta = {
  title: 'Transition',
} satisfies Meta<typeof CTransition>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CTransition },
    setup() {
      const mounted = ref(false)
      const toggle = () => {
        mounted.value = !mounted.value
      }
      return { mounted, toggle }
    },
    template: `
      <div style="padding:40px;">
        <c-transition :mounted="mounted" transition="pop">
          <template #default="{ styles }">
            <div :style="{ ...styles, background: 'pink', padding: 40 }">Transition me</div>
          </template>
        </c-transition>
        <button type="button" @click="toggle">toggle</button>
      </div>
    `,
  }),
}

export const ExitDuration: Story = {
  render: () => ({
    components: { CTransition },
    setup() {
      const mounted = ref(false)
      const toggle = () => {
        mounted.value = !mounted.value
      }
      return { mounted, toggle }
    },
    template: `
      <div style="padding:40px;">
        <c-transition :mounted="mounted" transition="pop" :duration="100" :exit-duration="3000">
          <template #default="{ styles }">
            <div :style="{ ...styles, background: 'pink', padding: 40, position: 'absolute', bottom: 100 }">Transition me</div>
          </template>
        </c-transition>
        <button type="button" @click="toggle">toggle</button>
      </div>
    `,
  }),
}

export const WithDelay: Story = {
  render: () => ({
    components: { CTransition },
    setup() {
      const mounted = ref(false)
      const toggle = () => {
        mounted.value = !mounted.value
      }
      return { mounted, toggle }
    },
    template: `
      <div style="padding:40px;">
        <c-transition :mounted="mounted" transition="pop" :enter-delay="500" :exit-delay="100">
          <template #default="{ styles }">
            <div :style="{ ...styles, background: 'pink', padding: 40 }">Transition me</div>
          </template>
        </c-transition>
        <button type="button" @click="toggle">toggle</button>
      </div>
    `,
  }),
}

// TODO
export const withActivityStatePreseration: Story = {
  render: () => ({
    components: { CTransition },
    setup() {
      const mounted = ref(false)
      const toggle = () => {
        mounted.value = !mounted.value
      }
      const value = ref(42)
      const updateValue = (event: Event) => {
        const target = event.target as HTMLInputElement
        const num = parseFloat(target.value)
        value.value = isNaN(num) ? 0 : num
      }
      return { mounted, toggle, updateValue, value }
    },
    template: `
      <div style="padding: 40px; display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <p :style="{ margin: 0, fontSize: 14, color: '#666'}">
          <strong>keepMounted</strong>: state inside the transition is preserved when hidden. Toggle the panel and notice the NumberInput value stays intact.
        </p>
        <c-transition :mounted="mounted" transition="fade" keepMounted>
          <template #default="{ styles }">
            <div :style="{ ...styles, background: '#f0f4ff', borderRadius: 8, padding: 20 }">
              <p :style="{ margin: '0 0 12px', fontWeight: 600 }">Hidden but state-preserved panel</p>
              <input type="number" :value="value" @input="updateValue" />
            </div>
          </template>
        </c-transition>
        <button type="button" @click="toggle">{{ mounted ? 'Hide panel' : 'Show panel' }}</button>
        <p :style="{ margin: 0, fontSize: 13, color: '#888' }">Current value reported outside the panel: <strong>{{ value }}</strong></p>
      </div>
    `,
  }),
}
