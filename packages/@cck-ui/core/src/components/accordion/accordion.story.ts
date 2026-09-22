import { Meta, StoryObj } from '@storybook/vue3-vite'
import CAccordion, { CAccordionControl, CAccordionItem, CAccordionPanel } from '.'
import { PlusIcon } from '@lucide/vue'
import { ref } from 'vue'

const meta = {
  title: 'Accordion',
  component: CAccordion,
} satisfies Meta<typeof CAccordion>

export default meta

type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => ({
    components: { CAccordion, CAccordionItem, CAccordionControl, CAccordionPanel, PlusIcon },
    template: `
      <div>
        <c-accordion defaultValue="flex" maw="400" mt="xl" mx="auto">
          <template #chevron>
            <plus-icon :size="16" />
          </template>
          <c-accordion-item value="custom">
            <c-accordion-control>Customization</c-accordion-control>
            <c-accordion-panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</c-accordion-panel>
          </c-accordion-item>

          <c-accordion-item value="flex">
            <c-accordion-control>Flexibility</c-accordion-control>
            <c-accordion-panel>Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles</c-accordion-panel>
          </c-accordion-item>

          <c-accordion-item value="focus">
            <c-accordion-control>No annoying focus ring</c-accordion-control>
            <c-accordion-panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>

        <c-accordion defaultValue="flex" maw="400" mt="xl" mx="auto" radius="lg" variant="contained">
          <c-accordion-item value="custom">
            <c-accordion-control>Customization</c-accordion-control>
            <c-accordion-panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</c-accordion-panel>
          </c-accordion-item>

          <c-accordion-item value="flex">
            <c-accordion-control>Flexibility</c-accordion-control>
            <c-accordion-panel>Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles</c-accordion-panel>
          </c-accordion-item>

          <c-accordion-item value="focus">
            <c-accordion-control>No annoying focus ring</c-accordion-control>
            <c-accordion-panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>

        <c-accordion defaultValue="flex" maw="400" mt="xl" mx="auto" variant="filled">
          <c-accordion-item value="custom">
            <c-accordion-control>Customization</c-accordion-control>
            <c-accordion-panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</c-accordion-panel>
          </c-accordion-item>

          <c-accordion-item value="flex">
            <c-accordion-control>Flexibility</c-accordion-control>
            <c-accordion-panel>Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles</c-accordion-panel>
          </c-accordion-item>

          <c-accordion-item value="focus">
            <c-accordion-control>No annoying focus ring</c-accordion-control>
            <c-accordion-panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>

        <c-accordion defaultValue="flex" maw="400" mt="xl" mx="auto" variant="separated" :order="3">
          <c-accordion-item value="custom">
            <c-accordion-control>
              <template #icon>$$</template>
              <template #chevron>
                <plus-icon :size="16" />
              </template>
              Customization
            </c-accordion-control>
            <c-accordion-panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</c-accordion-panel>
          </c-accordion-item>

          <c-accordion-item value="flex">
            <c-accordion-control>Flexibility</c-accordion-control>
            <c-accordion-panel>Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles</c-accordion-panel>
          </c-accordion-item>

          <c-accordion-item value="focus">
            <c-accordion-control>No annoying focus ring</c-accordion-control>
            <c-accordion-panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      </div>
    `,
  }),
}

export const NestedAccordions: Story = {
  render: () => ({
    components: { CAccordion, CAccordionItem, CAccordionControl, CAccordionPanel },
    template: `
      <div>
        <c-accordion maw="400" multiple mx="auto" variant="contained">
          <c-accordion-item value="item-1">
            <c-accordion-control>Nested 1</c-accordion-control>
            <c-accordion-panel>
              <c-accordion>
                <c-accordion-item value="custom">
                  <c-accordion-control>Customization</c-accordion-control>
                  <c-accordion-panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</c-accordion-panel>
                </c-accordion-item>

                <c-accordion-item value="flex">
                  <c-accordion-control>Flexibility</c-accordion-control>
                  <c-accordion-panel>Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles</c-accordion-panel>
                </c-accordion-item>

                <c-accordion-item value="focus">
                  <c-accordion-control>No annoying focus ring</c-accordion-control>
                  <c-accordion-panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</c-accordion-panel>
                </c-accordion-item>
              </c-accordion>
            </c-accordion-panel>
          </c-accordion-item>

          <c-accordion-item value="item-2">
            <c-accordion-control>Nested 2</c-accordion-control>
            <c-accordion-panel>
              <c-accordion>
                <c-accordion-item value="custom">
                  <c-accordion-control>Customization</c-accordion-control>
                  <c-accordion-panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</c-accordion-panel>
                </c-accordion-item>

                <c-accordion-item value="flex">
                  <c-accordion-control>Flexibility</c-accordion-control>
                  <c-accordion-panel>Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles</c-accordion-panel>
                </c-accordion-item>

                <c-accordion-item value="focus">
                  <c-accordion-control>No annoying focus ring</c-accordion-control>
                  <c-accordion-panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</c-accordion-panel>
                </c-accordion-item>
              </c-accordion>
            </c-accordion-panel>
          </c-accordion-item>
        </c-accordion>
      </div>
    `,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { CAccordion, CAccordionItem, CAccordionControl, CAccordionPanel },
    setup() {
      const activeItem = ref<string | null>('item-1')

      return { activeItem }
    },
    template: `
      <div>
        <c-accordion maw="400" mx="auto" v-model:value="activeItem">
          <c-accordion-item value="item-1">
            <c-accordion-control>Item 1</c-accordion-control>
            <c-accordion-panel>Content 1</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item value="item-2">
            <c-accordion-control>Item 2</c-accordion-control>
            <c-accordion-panel>Content 2</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item value="item-3">
            <c-accordion-control>Item 3</c-accordion-control>
            <c-accordion-panel>Content 3</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>

        <p> activeItem: {{ activeItem }}</p>
      </div>
    `,
  }),
}

export const ControlledMultiple: Story = {
  render: () => ({
    components: { CAccordion, CAccordionItem, CAccordionControl, CAccordionPanel },
    setup() {
      const activeItem = ref<string[]>(['item-1', 'item-3'])

      return { activeItem }
    },
    template: `
      <div>
        <c-accordion maw="400" multiple mx="auto" v-model:value="activeItem">
          <c-accordion-item value="item-1">
            <c-accordion-control>Item 1</c-accordion-control>
            <c-accordion-panel>Content 1</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item value="item-2">
            <c-accordion-control>Item 2</c-accordion-control>
            <c-accordion-panel>Content 2</c-accordion-panel>
          </c-accordion-item>
          <c-accordion-item value="item-3">
            <c-accordion-control>Item 3</c-accordion-control>
            <c-accordion-panel>Content 3</c-accordion-panel>
          </c-accordion-item>
        </c-accordion>

        <p> activeItem: {{ activeItem }}</p>
      </div>
    `,
  }),
}
